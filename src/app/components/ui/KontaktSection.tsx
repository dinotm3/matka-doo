"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ScrollReveal from "../animations/ui/ScrollReveal";
import { KONTAKT, SITE_INFO } from "../../constants/constants";
import { btnHighlight } from "../../constants/uiClasses";

export default function KontaktSection() {
  const [fields, setFields] = useState({
    ime: "",
    email: "",
    telefon: "",
    poruka: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFields({ ime: "", email: "", telefon: "", poruka: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section className="w-full bg-gray-50">
      <ScrollReveal
        direction="down"
        distance={45}
        fade
        fadeOutMode="only-up"
        amount={0.1}
        enterDuration={0.6}
        exitDuration={0.6}
        className="w-full"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          {/* Title */}
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              {KONTAKT.title}
            </h2>
            <p className="mt-3 text-lg text-gray-600">{KONTAKT.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact info */}
            <div className="space-y-8">
              <p className="text-gray-600 text-base leading-relaxed">
                {KONTAKT.description}
              </p>

              <div className="space-y-4">
                <Row label={KONTAKT.strings.email} value={SITE_INFO.email} />
                <Row
                  label={KONTAKT.strings.telefon}
                  value={SITE_INFO.phone}
                />
                <Row
                  label={KONTAKT.strings.adresa}
                  value={`${SITE_INFO.address}, ${SITE_INFO.zip_code} ${SITE_INFO.city}`}
                />
                <Row
                  label={KONTAKT.strings.radno_vrijeme}
                  value={KONTAKT.strings.radno_vrijeme_value}
                />
              </div>
            </div>

            {/* Form */}
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field
                  label={KONTAKT.strings.field_ime}
                  name="ime"
                  value={fields.ime}
                  onChange={handleChange}
                  placeholder={KONTAKT.strings.placeholder_ime}
                />
                <Field
                  label={KONTAKT.strings.field_email}
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder={KONTAKT.strings.placeholder_email}
                />
                <Field
                  label={KONTAKT.strings.field_telefon}
                  name="telefon"
                  type="tel"
                  value={fields.telefon}
                  onChange={handleChange}
                  placeholder={KONTAKT.strings.placeholder_telefon}
                />
                <Field
                  label={KONTAKT.strings.field_poruka}
                  name="poruka"
                  type="textarea"
                  value={fields.poruka}
                  onChange={handleChange}
                  placeholder={KONTAKT.strings.placeholder_poruka}
                />
                <button
                  type="submit"
                  className={[
                    "w-full rounded-full bg-brand-900",
                    "px-6 py-4 text-lg font-semibold text-white shadow-xl",
                    btnHighlight,
                  ].join(" ")}
                >
                  {KONTAKT.strings.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="font-semibold text-black">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

const inputClass = [
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3",
  "text-base text-gray-900 placeholder-gray-400",
  "focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20",
  "transition-colors",
].join(" ");

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
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
          required
          rows={4}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={inputClass}
        />
      )}
    </div>
  );
}
