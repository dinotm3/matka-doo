"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import ScrollReveal from "../../animations/ui/ScrollReveal";
import ScrollTopBtn from "../../buttons/ScrollTopBtn";
import { LOKACIJA, SITE_INFO, KONTAKT } from "../../../constants/constants";
import InteractiveMap from "../../maps/InteractiveMap";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { btnHighlight } from "../../../constants/uiClasses";
import { useNav } from "../../../context/NavContext";

export default function KontaktLokacijaSection() {
  const { setActiveNav } = useNav();
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
    <section className="relative w-full">
      {/* Full Width Map */}
      <ScrollReveal
        direction="down"
        distance={100}
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
      <div className="bg-gradient-to-b from-gray-50 to-white overflow-x-clip">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Location Info */}
            <ScrollReveal
              direction="left"
              distance={450}
              fade
              fadeOutMode="only-up"
              amount={0.1}
              enterDuration={1}
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
              direction="right"
              distance={450}
              fade
              fadeOutMode="only-up"
              amount={0.1}
              enterDuration={1}
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
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-900/10 flex items-center justify-center text-brand-900">
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
