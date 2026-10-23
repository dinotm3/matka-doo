"use client";

import { JSX, useEffect, useRef } from "react";
import { STRINGS, SERVICES_LIST } from "@/app/constants/constants";
import Reveal from "../../animations/ui/Reveal";
import { useNav } from "@/app/context/NavContext";
import Image from "next/image";
import FeatureCard from "../FeatureCard";
import {
  Award,
  BadgeCheck,
  Laptop2,
  ShieldCheck,
  Sparkles,
  Headphones,
  ArrowRight,
  Check,
} from "lucide-react";

export default function UslugeSection() {
  const { setActiveNav } = useNav();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Nav sync: mark "usluge" active whenever the section crosses the middle
  // band of the viewport, from either direction. An IntersectionObserver
  // fires only on state changes, unlike the previous scroll-progress hook
  // which ran a callback on every scrolled pixel.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setActiveNav("usluge");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setActiveNav]);

  // Feature icons for compact cards
  const iconProps = "h-5 w-5 text-white stroke-[1.5]";
  const FEATURE_ICONS: Record<string, JSX.Element> = {
    [STRINGS.features.digital.title]: <Laptop2 className={iconProps} />,
    [STRINGS.features.experience.title]: <Award className={iconProps} />,
    [STRINGS.features.precision.title]: <BadgeCheck className={iconProps} />,
    [STRINGS.features.trust.title]: <ShieldCheck className={iconProps} />,
    [STRINGS.features.individual.title]: <Sparkles className={iconProps} />,
    [STRINGS.features.support.title]: <Headphones className={iconProps} />,
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;
    const top = contactEl.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="relative">
      <section className="w-full text-brand-50">
        <div className="relative mx-auto w-full px-6 py-14 overflow-hidden">
          {/* Background.
              The green tint used to be a multiply-blended gradient stacked over
              the raw photo plus a second translucent gradient, all as separate
              full-section layers. mix-blend-mode forced the compositor to
              re-rasterise the stack while scrolling. The tint is now baked into
              /usluge-bg.webp (scripts/bake-usluge-bg.mjs); the three remaining
              light effects are plain gradients on ONE element, no blending. */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {/* unoptimized: the baked WebP is already 2000 px / ~50 KB. Letting
                next/image re-encode it squeezed 1920x2880 px into ~60 KB and
                smeared the ruler detail on large screens. */}
            <Image
              src="/usluge-bg.webp"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover object-[center_30%]"
              sizes="100vw"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: [
                  // Radial glow
                  "radial-gradient(ellipse 120% 80% at 50% 30%, rgba(120,200,150,0.15), transparent)",
                  // Light streak
                  "linear-gradient(145deg, transparent 35%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 58%, transparent 65%)",
                  // Vignette
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
                ].join(", "),
              }}
            />
          </div>

          {/* Feature Cards */}
          <div className="w-full">
            <div className="flex flex-col gap-8 items-center justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl w-full">
                {Object.values(STRINGS.features).map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={
                      feature.title === STRINGS.features.individual.title ? (
                        <>
                          Usluge i <span className="text-white font-semibold">cijene</span> prilagođavamo vašoj djelatnosti i stvarnim potrebama poslovanja.
                        </>
                      ) : (
                        feature.description
                      )
                    }
                    icon={FEATURE_ICONS[feature.title]}
                    variant="compact-green"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Services content */}
          <div className="relative">
            {/* Title */}
            <div id="usluge-title" className="w-full mt-8 scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                Kompletna ponuda usluga
              </h2>
            </div>

            {/* Divider */}
            <div className="h-px w-full max-w-4xl mx-auto bg-white/20 my-8" />

            {/* Services List - rows slide in from the left with a short stagger */}
            <ul className="max-w-5xl mx-auto space-y-5 list-none p-0 m-0">
              {SERVICES_LIST.map((service, index) => (
                <Reveal
                  key={service}
                  as="li"
                  direction="left"
                  distance={20}
                  amount={0.4}
                  delay={Math.min(index, 4) * 50}
                >
                  <div className="rounded-xl border border-white/20 bg-white/15 px-6 py-5 md:px-8 md:py-6 transition-colors duration-300 hover:bg-white/20 hover:border-white/30 min-h-[100px] md:min-h-[110px] flex items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                        <Check className="h-5 w-5 text-white stroke-[2.5]" />
                      </span>
                      <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                        {service}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* CTA Button */}
            <Reveal direction="up" distance={20} amount={0.5} className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={scrollToContact}
                className="group/btn rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg cursor-pointer flex items-center gap-2 transition-[transform,box-shadow] duration-200 ease-out hover:scale-105 hover:shadow-xl active:scale-[0.97]"
              >
                Kontaktirajte nas
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
