"use client";

import { useEffect, useRef, useState } from "react";
import Kontakt from "../buttons/Kontakt";
import ScrollTopBtn from "../buttons/ScrollTopBtn";
import { LOKACIJA, SITE_INFO } from "../../constants/constants";
import InteractiveMap from "../maps/InteractiveMap";
import ViewportFade from "../animations/ui/ViewPortFade";

export default function LokacijaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Start false so it can fade in the first time it appears
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;

      const isVisible = sectionCenter > 0 && sectionCenter < window.innerHeight;

      setVisible(isVisible);
    };

    // run once on mount
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="snap-location"
      className="w-full bg-white overflow-hidden"
    >
      <ViewportFade
        className="grid min-h-[70vh] lg:min-h-[80vh] lg:grid-cols-2"
        inDurationMs={1200}
        outDurationMs={300}
        mode="center"
      >
        {/* LEFT COLUMN */}
        <div className="relative flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-200 antialiased">
              {LOKACIJA.title}
            </h2>

            <p className="mt-5 text-lg md:text-xl leading-relaxed text-gray-700">
              {LOKACIJA.description}
            </p>

            <div className="mt-10 space-y-4 text-base md:text-lg text-gray-800">
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

          {/* Scroll to top button – NOT animated */}
          <ScrollTopBtn className="absolute bottom-6 right-6 z-50" />
        </div>

        {/* RIGHT COLUMN – MAP */}
        <div className="relative">
          <InteractiveMap
            className="lg:min-h-full"
            size="fill"
            src={LOKACIJA.embedURL}
            enableLabel={LOKACIJA.strings.interakcija_karta}
            closeLabel={LOKACIJA.strings.zatvori_mapu}
          />
        </div>
      </ViewportFade>
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
