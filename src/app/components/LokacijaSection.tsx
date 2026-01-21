"use client";

import { useEffect, useRef, useState } from "react";
import Kontakt from "./buttons/Kontakt";
import ScrollTopBtn from "./buttons/ScrollTopBtn";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function LokacijaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0); // 0..1 animation progress
  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // 0 when section is below viewport, increases as it enters
      const raw = (vh - rect.top) / vh;

      // ✅ tighter + slower but guaranteed to finish by the time you land
      const start = 0.45;
      const end = 0.92;

      let t = clamp01((raw - start) / (end - start));
      t = easeOutCubic(t);

      if (t > 0.98) t = 1; // ✅ snap to fully finished

      setP(t);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const slide = 180;
  const finished = p > 0.98;

  // ✅ integer pixels + translate3d = crisper rendering
  const leftX = finished ? 0 : Math.round(-slide * (1 - p));
  const rightX = finished ? 0 : Math.round(slide * (1 - p));
  const opacity = finished ? 1 : p;

  return (
    <section
      ref={sectionRef}
      id="location"
      className="w-full bg-white overflow-hidden"
    >
      <div className="grid min-h-[70vh] lg:min-h-[80vh] lg:grid-cols-2">
        {/* LEFT column (relative so button anchors here) */}
        <div className="relative flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="max-w-xl">
            {/* ✅ Keep title OUT of transform so it stays crisp */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-200 antialiased">
              Lokacija ureda
            </h2>

            {/* ✅ Animate the rest of the left content */}
            <div
              style={{
                opacity,
                transform: `translate3d(${leftX}px, 0, 0)`,
                willChange: "transform, opacity",
              }}
            >
              <p className="mt-5 text-lg md:text-xl leading-relaxed text-gray-700">
                Nalazimo se u Zagrebu. Dostupni smo za osobni dolazak uz
                prethodnu najavu, ali i potpuno digitalnu suradnju.
              </p>

              <div className="mt-10 space-y-4 text-base md:text-lg text-gray-800">
                <div className="flex gap-3">
                  <span className="font-semibold">Adresa:</span>
                  <span className="text-gray-700">
                    Ksaverska cesta 47, 10000 Zagreb
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="font-semibold">Radno vrijeme:</span>
                  <span className="text-gray-700">Pon–Pet, 8:00–16:00</span>
                </div>

                <div className="flex gap-3">
                  <span className="font-semibold">Kontakt:</span>
                  <span className="text-gray-700">
                    info@matka.hr · 01 / 234 5678
                  </span>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="text-gray-700 text-base md:text-lg">
                  <span className="font-semibold text-gray-900">
                    Dogovorite sastanak
                  </span>{" "}
                  ili postavite pitanje{" "}
                  <span className="inline-block align-middle text-brand-200 text-2xl md:text-3xl font-bold">
                    →
                  </span>
                </div>

                <Kontakt />
              </div>
            </div>
          </div>

          {/* ✅ ScrollTopBtn anchored to LEFT column, NOT part of animated wrapper */}
          <ScrollTopBtn className="absolute bottom-6 right-6 z-50" />
        </div>

        {/* RIGHT column (map) */}
        <div
          className="relative min-h-[360px] lg:min-h-full"
          style={{
            opacity,
            transform: `translate3d(${rightX}px, 0, 0)`,
            willChange: "transform, opacity",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.947340492939!2d15.975098876723617!3d45.832336508800175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7136b54af43%3A0xcd2ebb0482af9f48!2sKnjigovodstvo%20Matka!5e0!3m2!1shr!2shr!4v1769009498430!5m2!1shr!2shr"
            className={[
              "absolute inset-0 h-full w-full",
              mapActive ? "pointer-events-auto" : "pointer-events-none",
            ].join(" ")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* overlay that enables map interaction */}
          {!mapActive && (
            <button
              type="button"
              onClick={() => setMapActive(true)}
              className="absolute inset-0 z-10 grid place-items-center bg-white/0"
              aria-label="Enable map interaction"
            >
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow">
                Kliknite za interakciju s kartom
              </span>
            </button>
          )}

          {/* optional: click outside disables it */}
          {mapActive && (
            <button
              type="button"
              onClick={() => setMapActive(false)}
              className="absolute top-3 right-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow"
            >
              Zatvori mapu
            </button>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/0 to-white/10" />
        </div>
      </div>
    </section>
  );
}
