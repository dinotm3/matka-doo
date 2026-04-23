"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "../../animations/ui/ScrollReveal";
import ScrollTopBtn from "../../buttons/ScrollTopBtn";
import { LOKACIJA, SITE_INFO, KONTAKT } from "../../../constants/constants";
import InteractiveMap from "../../maps/InteractiveMap";
import { MapPin, Clock, Mail, Phone, Loader2 } from "lucide-react";
import { btnHighlight } from "../../../constants/uiClasses";
import { useNav } from "../../../context/NavContext";
import { isValidEmail, isValidPhone } from "../../../utils/validation";

// Extend window for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export default function KontaktLokacijaSection() {
  const { setActiveNav } = useNav();
  const [fields, setFields] = useState({
    ime: "",
    email: "",
    telefon: "",
    poruka: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Lazy-load reCAPTCHA script only when contact section is near viewport
  const sectionObserverRef = useRef<HTMLDivElement>(null);
  const recaptchaLoaded = useRef(false);

  const loadRecaptcha = useCallback(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || recaptchaLoaded.current) return;
    recaptchaLoaded.current = true;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const el = sectionObserverRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadRecaptcha();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before visible
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        `script[src*="recaptcha"]`
      );
      if (existingScript) existingScript.remove();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
    };
  }, [loadRecaptcha]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSubmitError("");
  };

  const validateFields = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fields.ime.trim()) {
      newErrors.ime = "Ime je obavezno";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Email je obavezan";
    } else if (!isValidEmail(fields.email)) {
      newErrors.email = "Unesite ispravnu email adresu";
    }

    if (fields.telefon && !isValidPhone(fields.telefon)) {
      newErrors.telefon = "Unesite ispravan broj telefona";
    }

    if (!fields.poruka.trim()) {
      newErrors.poruka = "Poruka je obavezna";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRecaptchaToken = async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) return null;

    try {
      return await new Promise((resolve) => {
        window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(siteKey, {
            action: "contact_form",
          });
          resolve(token);
        });
      });
    } catch {
      console.error("Failed to get reCAPTCHA token");
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setErrors({});

    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If server returns a specific field error, highlight that field
        if (data.field) {
          setErrors({ [data.field]: data.error });
        } else {
          setSubmitError(data.error || "Došlo je do greške");
        }
        return;
      }

      setSubmitted(true);
      setFields({ ime: "", email: "", telefon: "", poruka: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Došlo je do greške. Molimo pokušajte ponovno."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionObserverRef} className="relative w-full">
      {/* Full Width Map — opacity-only fade, no translate (a 50–60vh iframe
          is too expensive to paint-animate with a transform). */}
      <ScrollReveal
        direction="none"
        distance={0}
        fade
        fadeOutMode="only-up"
        amount={0.1}
        enterDuration={0.6}
        exitDuration={0.6}
        className="w-full"
        onEnter={() => setActiveNav("location")}
        onLeave={() => setActiveNav("usluge")}
      >
        <div className="w-full h-[50vh] md:h-[60vh]">
          <InteractiveMap
            className="w-full h-full"
            minHeight="100%"
            src={LOKACIJA.embedURL}
            enableLabel={LOKACIJA.strings.interakcija_karta}
            closeLabel={LOKACIJA.strings.zatvori_mapu}
          />
        </div>
      </ScrollReveal>

      {/* Content Section */}
      <div className="relative overflow-x-clip">
        {/* Grayish-white with subtle brand-green tint */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(to bottom, #f1f3f1, #e6ede8)",
          }}
        />

        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Location Info */}
            <ScrollReveal
              direction="down"
              distance={45}
              fade
              fadeOutMode="only-up"
              amount={0.1}
              enterDuration={0.6}
              exitDuration={0.6}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  {LOKACIJA.title}
                </h2>

                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  {LOKACIJA.description}
                </p>

                <div className="mt-8 space-y-3">
                  <InfoRow
                    icon={<MapPin className="h-5 w-5" />}
                    label={LOKACIJA.strings.adresa}
                    value={LOKACIJA.adresa}
                  />
                  <InfoRow
                    icon={<Clock className="h-5 w-5" />}
                    label={LOKACIJA.strings.radno_vrijeme_title}
                    value={LOKACIJA.strings.radno_vrijeme}
                  />
                  <InfoRow
                    icon={<Mail className="h-5 w-5" />}
                    label={LOKACIJA.strings.email}
                    value={SITE_INFO.email}
                  />
                  <InfoRow
                    icon={<Phone className="h-5 w-5" />}
                    label={LOKACIJA.strings.telefon}
                    value={SITE_INFO.phone}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Contact Form */}
            <ScrollReveal
              direction="down"
              distance={45}
              fade
              fadeOutMode="only-up"
              amount={0.1}
              enterDuration={0.6}
              exitDuration={0.6}
              onEnter={() => setActiveNav("contact")}
              onLeave={() => setActiveNav("location")}
            >
              <div id="contact" className="scroll-mt-20">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  {KONTAKT.title}
                </h2>
                <p className="mt-2 text-lg text-gray-600">{KONTAKT.subtitle}</p>

                <div className="mt-8">
                  {submitted ? (
                    <div className="rounded-2xl bg-brand-900/10 border border-brand-900/20 px-8 py-12 text-center">
                      <p className="text-brand-900 font-semibold text-xl">
                        {KONTAKT.strings.success_title}
                      </p>
                      <p className="mt-2 text-gray-600">
                        {KONTAKT.strings.success_body}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Field
                        label={KONTAKT.strings.field_ime}
                        name="ime"
                        value={fields.ime}
                        onChange={handleChange}
                        placeholder={KONTAKT.strings.placeholder_ime}
                        error={errors.ime}
                        disabled={isLoading}
                      />
                      <Field
                        label={KONTAKT.strings.field_email}
                        name="email"
                        type="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder={KONTAKT.strings.placeholder_email}
                        error={errors.email}
                        disabled={isLoading}
                      />
                      <Field
                        label={`${KONTAKT.strings.field_telefon} (opcionalno)`}
                        name="telefon"
                        type="tel"
                        value={fields.telefon}
                        onChange={handleChange}
                        placeholder={KONTAKT.strings.placeholder_telefon}
                        error={errors.telefon}
                        disabled={isLoading}
                        required={false}
                      />
                      <Field
                        label={KONTAKT.strings.field_poruka}
                        name="poruka"
                        type="textarea"
                        value={fields.poruka}
                        onChange={handleChange}
                        placeholder={KONTAKT.strings.placeholder_poruka}
                        error={errors.poruka}
                        disabled={isLoading}
                      />

                      {submitError && (
                        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={[
                          "w-full rounded-full bg-brand-900 cursor-pointer",
                          "px-6 py-4 text-lg font-semibold text-white shadow-xl",
                          "disabled:opacity-70 disabled:cursor-not-allowed",
                          "flex items-center justify-center gap-2",
                          btnHighlight,
                        ].join(" ")}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Šaljem...
                          </>
                        ) : (
                          KONTAKT.strings.submit
                        )}
                      </button>

                      {/* reCAPTCHA notice */}
                      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                        <p className="text-xs text-gray-500 text-center">
                          Ovaj obrazac je zaštićen pomoću reCAPTCHA i primjenjuju se Google{" "}
                          <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-700"
                          >
                            Pravila privatnosti
                          </a>{" "}
                          i{" "}
                          <a
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gray-700"
                          >
                            Uvjeti korištenja
                          </a>
                          .
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <ScrollTopBtn className="fixed bottom-6 right-6 z-[100]" />
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-500">{label}</span>
        <span className="block text-base font-semibold text-gray-900 mt-0.5">
          {value}
        </span>
      </div>
    </div>
  );
}

const inputClass = [
  "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3",
  "text-base text-gray-900 placeholder-gray-400",
  "focus:border-brand-900 focus:outline-none focus:ring-4 focus:ring-brand-900/10",
  "focus:shadow-lg focus:-translate-y-0.5",
  "transition-all duration-300",
  "disabled:opacity-60 disabled:cursor-not-allowed",
].join(" ");

const inputErrorClass = "border-red-400 focus:border-red-500 focus:ring-red-100";

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1.5"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          disabled={disabled}
          rows={4}
          className={`${inputClass} resize-none ${error ? inputErrorClass : ""}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          disabled={disabled}
          className={`${inputClass} ${error ? inputErrorClass : ""}`}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
