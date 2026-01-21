"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollTopBtn from "./buttons/ScrollTopBtn";
import Kontakt from "./buttons/Kontakt";
export default function LokacijaSection() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // tweak: show after user scrolls a bit (or use 1200 etc)
      setShowUp(window.scrollY > 1200);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="location" className="w-full bg-white">
      <div className="grid min-h-[70vh] lg:min-h-[80vh] lg:grid-cols-2">
        {/* LEFT: info */}
        <div className="relative flex items-center justify-center px-6 py-16 lg:px-16">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-200">
              Lokacija ureda
            </h2>

            <p className="mt-5 text-lg md:text-xl leading-relaxed text-gray-700">
              Nalazimo se u Zagrebu. Dostupni smo za osobni dolazak uz prethodnu
              najavu, ali i potpuno digitalnu suradnju.
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

            {/* CTA line + button */}
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
            <ScrollTopBtn />
          </div>
        </div>

        {/* RIGHT: map */}
        <div className="relative min-h-[360px] lg:min-h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.947340492939!2d15.975098876723617!3d45.832336508800175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7136b54af43%3A0xcd2ebb0482af9f48!2sKnjigovodstvo%20Matka!5e0!3m2!1shr!2shr!4v1769009498430!5m2!1shr!2shr"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/0 to-white/10" />
        </div>
      </div>
    </section>
  );
}
