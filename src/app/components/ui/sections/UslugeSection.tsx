"use client";

import { JSX, useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { motion, useScroll, useTransform } from "framer-motion";
import { STRINGS, SERVICES_LIST } from "@/app/constants/constants";
import ScrollReveal from "../../animations/ui/ScrollReveal";
import { useNav } from "@/app/context/NavContext";
import type Lenis from "lenis";
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
  ChevronDown,
  Check,
} from "lucide-react";


export default function UslugeSection() {
  const { setActiveNav, forceExpanded } = useNav();
  const sectionRef = useRef<HTMLDivElement>(null);

  // On larger viewports, start with a few service rows already visible
  const [initialHeight, setInitialHeight] = useState("0px");
  const [initialOpacity, setInitialOpacity] = useState(0);

  // Runs before paint to prevent the map's ScrollReveal from firing
  // onEnter during the brief 0px state
  useIsomorphicLayoutEffect(() => {
    if (window.innerHeight > 1100) {
      setInitialHeight("700px");
      setInitialOpacity(1);
    }
  }, []);

  // Scroll progress for expanding effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start -1.5"],
  });

  // Expandable content max-height: initialHeight -> full over scroll distance
  const expandHeight = useTransform(
    scrollYProgress,
    [0.05, 0.85],
    [initialHeight, "3000px"],
  );
  const expandOpacity = useTransform(scrollYProgress, [0.15, 0.3], [initialOpacity, 1]);

  // Chevron visible until content is nearly fully expanded
  const [showChevron, setShowChevron] = useState(true);

  // Set nav to "usluge" when scrolling through section + control chevron visibility
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.15 && latest < 0.6) {
        setActiveNav("usluge");
      }
      setShowChevron(latest < 0.8);
    });
    return unsubscribe;
  }, [scrollYProgress, setActiveNav]);

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

  const getLenis = () => (window as unknown as { lenis?: Lenis }).lenis;

  const scrollToContact = () => {
    const lenis = getLenis();
    const contactEl = document.getElementById("contact");
    if (lenis && contactEl) {
      lenis.scrollTo(contactEl, { duration: 1.2, offset: -80 });
    } else {
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={sectionRef}>
      <section className="w-full text-brand-50">
        <div className="relative mx-auto w-full px-6 py-14 overflow-hidden">
          {/* Background - static */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Background image */}
            <Image
              src="/ruler.webp"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover object-[center_30%]"
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={40}
            />

            {/* Color overlay */}
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background:
                  "linear-gradient(to bottom right, rgb(30,100,65), rgb(35,110,72), rgb(25,85,55))",
              }}
            />

            {/* Secondary overlay for depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(20,70,48,0.65), rgba(25,90,58,0.6), rgba(18,55,40,0.7))",
              }}
            />

            {/* Radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 120% 80% at 50% 30%, rgba(120,200,150,0.15), transparent)",
              }}
            />

            {/* Light streak effect */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, transparent 35%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 58%, transparent 65%)",
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </div>

          {/* Feature Cards Section - no fade to prevent nav jump on load */}
          <div className="w-full">
            <div className="flex flex-col gap-8 items-center justify-center">
              {/* 6 Feature Cards - 3 columns (2 rows) */}
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

          {/* Expandable content - height animates based on scroll */}
          <motion.div
            id="usluge-expandable"
            style={{
              maxHeight: forceExpanded ? "none" : expandHeight,
              opacity: forceExpanded ? 1 : expandOpacity,
            }}
            className="overflow-hidden relative"
          >
            {/* Title */}
            <ScrollReveal
              direction="none"
              distance={0}
              fade={false}
              amount={0.5}
            >
              <div id="usluge-title" className="w-full mt-8 scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
                  Kompletna ponuda usluga
                </h2>
              </div>
            </ScrollReveal>

            {/* Divider */}
            <div className="h-px w-full max-w-4xl mx-auto bg-white/20 my-8" />

            {/* Services List - each item fades in individually */}
            <div className="max-w-5xl mx-auto space-y-5">
              {SERVICES_LIST.map((service, index) => (
                <ScrollReveal
                  key={index}
                  direction="left"
                  distance={20}
                  fade
                  fadeOutMode="only-up"
                  amount={0.5}
                  enterDuration={0.4}
                  exitDuration={0.3}
                >
                  <div className="group rounded-xl border border-white/20 bg-white/10 px-6 py-5 md:px-8 md:py-6 backdrop-blur transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] origin-center min-h-[100px] md:min-h-[110px] flex items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                        <Check className="h-5 w-5 text-white stroke-[2.5]" />
                      </span>
                      <p className="text-lg leading-relaxed text-white/90 md:text-xl">
                        {service}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA Button */}
            <ScrollReveal
              direction="up"
              distance={20}
              fade
              fadeOutMode="only-up"
              amount={0.5}
              enterDuration={0.4}
              exitDuration={0.3}
              className="mt-8 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="group/btn rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-all hover:shadow-xl cursor-pointer flex items-center gap-2"
              >
                Kontaktirajte nas
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </ScrollReveal>

            {/* Scroll indicator - pinned to bottom of visible area */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 pt-10 bg-gradient-to-t from-[rgb(25,85,55)] via-[rgba(25,85,55,0.8)] to-transparent pointer-events-none transition-opacity duration-500"
              style={{ opacity: showChevron ? 1 : 0 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-white/70"
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Spacer component with background between sections
export function UslugeSpacer() {
  return (
    <div className="h-8 w-full relative">
      <Image
        src="/white_bg.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={60}
        className="object-cover opacity-40"
      />
    </div>
  );
}
