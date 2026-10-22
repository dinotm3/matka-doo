import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, isValidPhone, escapeHtml } from "@/app/utils/validation";

// ---------------------------------------------------------------------------
// Rate limiting
//
// In-memory sliding window per client IP. On Vercel every serverless instance
// keeps its own map, so this caps bursts per instance rather than globally.
// That is enough to stop a script hammering the form without adding a KV
// store for a site that gets a handful of enquiries a week.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_PER_WINDOW = 5;
const rateHits = new Map<string, number[]>();

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_MAX_PER_WINDOW) {
    rateHits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateHits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (rateHits.size > 5000) {
    for (const [key, times] of rateHits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) rateHits.delete(key);
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// reCAPTCHA v3
// ---------------------------------------------------------------------------
const RECAPTCHA_MIN_SCORE = 0.3;

type RecaptchaResult =
  | { ok: true; score?: number }
  | { ok: false; reason: string; retryable?: boolean };

async function verifyRecaptcha(token: string, secretKey: string): Promise<RecaptchaResult> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });

    if (!response.ok) {
      return { ok: false, reason: `siteverify HTTP ${response.status}`, retryable: true };
    }

    const data = await response.json();

    if (!data.success) {
      const codes = Array.isArray(data["error-codes"]) ? data["error-codes"].join(", ") : "unknown";
      return { ok: false, reason: `reCAPTCHA failed: ${codes}` };
    }

    if (typeof data.score === "number" && data.score < RECAPTCHA_MIN_SCORE) {
      return { ok: false, reason: `score too low: ${data.score}` };
    }

    return { ok: true, score: data.score };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return { ok: false, reason: "verification request failed", retryable: true };
  }
}

// ---------------------------------------------------------------------------
// Input handling
// ---------------------------------------------------------------------------
const MAX_LENGTH = { ime: 100, email: 254, telefon: 30, poruka: 5000 } as const;

function stringField(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(error: string, field?: string) {
  return NextResponse.json(field ? { error, field } : { error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(clientIp(request))) {
      return NextResponse.json(
        { error: "Previše pokušaja. Pokušajte ponovno za nekoliko minuta." },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return badRequest("Neispravan zahtjev.");
    }
    if (!body || typeof body !== "object") {
      return badRequest("Neispravan zahtjev.");
    }

    const ime = stringField(body, "ime");
    const email = stringField(body, "email");
    const telefon = stringField(body, "telefon");
    const poruka = stringField(body, "poruka");
    const recaptchaToken = stringField(body, "recaptchaToken");

    // Required fields with specific errors
    if (!ime) return badRequest("Ime i prezime je obavezno.", "ime");
    if (!email) return badRequest("Email adresa je obavezna.", "email");
    if (!isValidEmail(email)) {
      return badRequest(
        "Email adresa nije ispravna. Provjerite format (npr. ime@email.com).",
        "email"
      );
    }
    if (telefon && !isValidPhone(telefon)) {
      return badRequest(
        "Broj telefona nije ispravan. Koristite format: +385 1 234 5678 ili 01-234-5678.",
        "telefon"
      );
    }
    if (!poruka) return badRequest("Poruka je obavezna.", "poruka");

    // Length caps keep the email readable and block oversized payloads
    if (ime.length > MAX_LENGTH.ime) return badRequest("Ime i prezime je predugačko.", "ime");
    if (email.length > MAX_LENGTH.email) return badRequest("Email adresa je predugačka.", "email");
    if (telefon.length > MAX_LENGTH.telefon) return badRequest("Broj telefona je predugačak.", "telefon");
    if (poruka.length > MAX_LENGTH.poruka) {
      return badRequest(`Poruka je predugačka (najviše ${MAX_LENGTH.poruka} znakova).`, "poruka");
    }

    // reCAPTCHA: required whenever the server is configured for it.
    // Without a secret key (local dev) the check is skipped with a warning.
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        console.warn("Contact form: request without reCAPTCHA token rejected");
        return badRequest("Sigurnosna provjera nije uspjela. Osvježite stranicu i pokušajte ponovno.");
      }

      const result = await verifyRecaptcha(recaptchaToken, recaptchaSecret);
      if (!result.ok) {
        console.warn("Contact form: reCAPTCHA rejected:", result.reason);
        if (result.retryable) {
          return NextResponse.json(
            { error: "Sigurnosna provjera trenutno nije dostupna. Pokušajte ponovno za minutu." },
            { status: 503 }
          );
        }
        return badRequest("Sigurnosna provjera nije uspjela. Osvježite stranicu i pokušajte ponovno.");
      }
    } else {
      console.warn("RECAPTCHA_SECRET_KEY not set, skipping verification");
    }

    // Email configuration
    if (!process.env.RESEND_API_KEY) {
      console.error("Email configuration missing: RESEND_API_KEY not set");
      return NextResponse.json(
        { error: "Slanje emaila trenutno nije dostupno. Molimo kontaktirajte nas direktno." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Escape user input before HTML interpolation to prevent injection
    // when the email is rendered in the recipient's mail client.
    const safeIme = escapeHtml(ime);
    const safeEmail = escapeHtml(email);
    const safeTelefon = telefon ? escapeHtml(telefon) : "";
    const safePoruka = escapeHtml(poruka).replace(/\n/g, "<br/>");

    const { error: sendError } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "matka@knjigovodstvo-matka.hr",
      to: process.env.EMAIL_TO || "dtretinjakmesaric@gmail.com",
      replyTo: email,
      subject: `Nova poruka s web stranice - ${ime}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e6441; border-bottom: 2px solid #1e6441; padding-bottom: 10px;">
            Nova poruka s kontakt obrasca
          </h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;">
              <strong>Ime i prezime:</strong><br/>
              ${safeIme}
            </p>
            <p style="margin: 0 0 10px 0;">
              <strong>Email:</strong><br/>
              <a href="mailto:${safeEmail}">${safeEmail}</a>
            </p>
            ${
              safeTelefon
                ? `<p style="margin: 0 0 10px 0;">
                <strong>Telefon:</strong><br/>
                <a href="tel:${safeTelefon}">${safeTelefon}</a>
              </p>`
                : ""
            }
            <p style="margin: 0;">
              <strong>Poruka:</strong><br/>
              ${safePoruka}
            </p>
          </div>

          <p style="color: #666; font-size: 12px;">
            Ova poruka je poslana putem kontakt obrasca na web stranici.
          </p>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      throw new Error(sendError.message);
    }

    return NextResponse.json({ message: "Poruka je uspješno poslana!" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Došlo je do greške pri slanju. Molimo pokušajte ponovno ili nas kontaktirajte direktno." },
      { status: 500 }
    );
  }
}
