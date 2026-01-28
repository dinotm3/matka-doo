import React from "react";
import ScrollReveal from "../animations/ui/ScrollReveal";
import Kontakt from "../buttons/Kontakt";
import ScrollTopBtn from "../buttons/ScrollTopBtn";
import { LOKACIJA, SITE_INFO } from "../../constants/constants";
import InteractiveMap from "../maps/InteractiveMap";

export default function LokacijaSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid w-full lg:grid-cols-2 lg:min-h-[80vh] items-stretch">
        {/* LEFT CONTENT */}
        <div className="relative h-full flex items-center justify-center px-6 py-16 lg:px-16">
          <ScrollReveal
            direction="left"
            distance={90}
            fade
            fadeOut
            amount={0.5}
            enterDuration={3.14}
            exitDuration={0.6}
            className="w-full"
          >
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-200 antialiased">
                {LOKACIJA.title}
              </h2>

              <p className="mt-5 text-lg md:text-xl leading-relaxed text-gray-700">
                {LOKACIJA.description}
              </p>

              <div className="mt-8 space-y-4 text-base md:text-lg text-gray-800">
                <Row label={LOKACIJA.strings.adresa} value={LOKACIJA.adresa} />
                <Row
                  label={LOKACIJA.strings.radno_vrijeme_title}
                  value={LOKACIJA.strings.radno_vrijeme}
                />
                <Row label={LOKACIJA.strings.email} value={SITE_INFO.email} />
                <Row label={LOKACIJA.strings.telefon} value={SITE_INFO.phone} />
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold text-gray-900">
                    {LOKACIJA.strings.sastanak_part_1}
                  </span>{" "}
                  {LOKACIJA.strings.sastanak_part_2}{" "}
                  <span className="inline-block align-middle text-brand-200 text-2xl md:text-3xl font-bold">
                    →
                  </span>
                </div>

                <Kontakt />
              </div>
            </div>
          </ScrollReveal>

          {/* Scroll-to-top button stays layout-only (no animation wrapper) */}
          <ScrollTopBtn className="absolute bottom-6 right-6 z-[100]" />
        </div>

        {/* RIGHT MAP */}
        <div className="relative h-full">
          <ScrollReveal
            direction="right"
            distance={90}
            fade
            fadeOut
            amount={0.5}
            enterDuration={3.14}
            exitDuration={0.6}
            className="h-full"
          >
            <InteractiveMap
              className="w-full h-full"
              minHeight="100%"
              src={LOKACIJA.embedURL}
              enableLabel={LOKACIJA.strings.interakcija_karta}
              closeLabel={LOKACIJA.strings.zatvori_mapu}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}
