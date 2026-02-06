import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isValidEmail, isValidPhone } from "@/app/utils/validation";

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn("RECAPTCHA_SECRET_KEY not set, skipping verification");
    return { success: true };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      }
    );
    const data = await response.json();

    console.log("reCAPTCHA response:", JSON.stringify(data));

    if (!data.success) {
      return { success: false, error: `reCAPTCHA failed: ${data["error-codes"]?.join(", ") || "unknown"}` };
    }

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 0.3 is a lenient threshold (lower = more permissive)
    if (data.score < 0.3) {
      return { success: false, score: data.score, error: `Score too low: ${data.score}` };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    // On error, allow the submission but log it
    return { success: true, error: "Verification skipped due to error" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ime, email, telefon, poruka, recaptchaToken } = body;

    // Validate required fields with specific errors
    if (!ime?.trim()) {
      return NextResponse.json(
        { error: "Ime i prezime je obavezno.", field: "ime" },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "Email adresa je obavezna.", field: "email" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Email adresa nije ispravna. Provjerite format (npr. ime@email.com).", field: "email" },
        { status: 400 }
      );
    }

    if (telefon && !isValidPhone(telefon)) {
      return NextResponse.json(
        { error: "Broj telefona nije ispravan. Koristite format: +385 1 234 5678 ili 01-234-5678.", field: "telefon" },
        { status: 400 }
      );
    }

    if (!poruka?.trim()) {
      return NextResponse.json(
        { error: "Poruka je obavezna.", field: "poruka" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA (if token provided)
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA failed:", recaptchaResult.error);
        return NextResponse.json(
          { error: "Sigurnosna provjera nije uspjela. Osvježite stranicu i pokušajte ponovno." },
          { status: 400 }
        );
      }
    }

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing: EMAIL_USER or EMAIL_PASS not set");
      return NextResponse.json(
        { error: "Slanje emaila trenutno nije dostupno. Molimo kontaktirajte nas direktno." },
        { status: 500 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
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
              ${ime}
            </p>
            <p style="margin: 0 0 10px 0;">
              <strong>Email:</strong><br/>
              <a href="mailto:${email}">${email}</a>
            </p>
            ${
              telefon
                ? `<p style="margin: 0 0 10px 0;">
                <strong>Telefon:</strong><br/>
                <a href="tel:${telefon}">${telefon}</a>
              </p>`
                : ""
            }
            <p style="margin: 0;">
              <strong>Poruka:</strong><br/>
              ${poruka.replace(/\n/g, "<br/>")}
            </p>
          </div>

          <p style="color: #666; font-size: 12px;">
            Ova poruka je poslana putem kontakt obrasca na web stranici.
          </p>
        </div>
      `,
      text: `
Nova poruka s kontakt obrasca

Ime i prezime: ${ime}
Email: ${email}
${telefon ? `Telefon: ${telefon}` : ""}
Poruka:
${poruka}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Poruka je uspješno poslana!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("Invalid login") || errorMessage.includes("auth")) {
      return NextResponse.json(
        { error: "Problem s konfiguracijom emaila. Molimo kontaktirajte nas direktno." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Došlo je do greške pri slanju. Molimo pokušajte ponovno ili nas kontaktirajte direktno." },
      { status: 500 }
    );
  }
}
