"use client";

import { useMemo, useRef } from "react";
import Kontakt from "../buttons/Kontakt";
import ScrollTopBtn from "../buttons/ScrollTopBtn";
import { LOKACIJA, SITE_INFO } from "../../constants/constants";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useMapInteractionLock } from "../hooks/useMapInteractionLock";
import InteractiveMap from "../maps/InteractiveMap";

export default function LokacijaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const {
    wrapRef: mapWrapRef,
    mapActive,
    setMapActive,
    setIsOverMap,
  } = useMapInteractionLock<HTMLDivElement>();

  const p = useScrollProgress(sectionRef, {
    start: 0.8,
    end: 0.92,
    freeze: mapActive,
    snapToOneAfter: 0.98,
  });

  const anim = useMemo(() => {
    const slide = 360;
    const finished = p > 0.98;

    const leftX = finished ? 0 : Math.round(-slide * (1 - p));
    const rightX = finished ? 0 : Math.round(slide * (1 - p));
    const opacity = finished ? 1 : p;

    const common: React.CSSProperties = {
      opacity,
      willChange: "transform, opacity",
    };

    return {
      leftStyle: { ...common, transform: `translate3d(${leftX}px,0,0)` },
      rightStyle: { ...common, transform: `translate3d(${rightX}px,0,0)` },
    };
  }, [p]);

  return (
    <section
      ref={sectionRef}
      id="snap-location"
      className="w-full bg-white overflow-hidden"
    >
      <div className="grid min-h-[70vh] lg:min-h-[80vh] lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="relative flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-200 antialiased">
              {LOKACIJA.title}
            </h2>

            <div style={anim.leftStyle}>
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
          </div>

          {/* Scroll to top button – NOT animated */}
          <ScrollTopBtn className="absolute bottom-6 right-6 z-50" />
        </div>

        <InteractiveMap
          className="lg:min-h-full"
          size="fill"
          src={LOKACIJA.embedURL}
          enableLabel={LOKACIJA.strings.interakcija_karta}
          closeLabel={LOKACIJA.strings.zatvori_mapu}
        />
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
