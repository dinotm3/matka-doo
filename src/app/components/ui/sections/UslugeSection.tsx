"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { USLUGE, USLUGE_KOMPLETNO } from "@/app/constants/constants";
import ScrollReveal from "../../animations/ui/ScrollReveal";
import { ChevronDown } from "lucide-react";
import { btnHighlight } from "@/app/constants/uiClasses";
import { useNav } from "@/app/context/NavContext";
import Lenis from "lenis";

export default function UslugeSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setActiveNav } = useNav();
  const savedScrollPosition = useRef<number | null>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  // Get Lenis instance for smooth scrolling
  const getLenis = () => (window as unknown as { lenis?: Lenis }).lenis;

  const handleExpand = () => {
    savedScrollPosition.current = window.scrollY;
    setIsExpanded(true);

    // Wait for React + framer-motion to mount the expanded content
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = expandedContentRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // Current absolute scroll position + element's top in viewport
        const elementTopAbsolute = window.scrollY + rect.top;

        // Center the element in the viewport
        const target =
          elementTopAbsolute - (window.innerHeight / 2 - rect.height / 2);

        const lenis = getLenis();
        const clamped = Math.max(0, target);

        if (lenis) {
          lenis.scrollTo(clamped, { duration: 1.1 });
        } else {
          window.scrollTo({ top: clamped, behavior: "smooth" });
        }
      });
    });
  };

  const handleClose = () => {
    const savedPos = savedScrollPosition.current;
    setIsExpanded(false);
    // Restore scroll position after a brief delay for animation
    if (savedPos !== null) {
      setTimeout(() => {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(savedPos, { duration: 1.4 });
        } else {
          window.scrollTo({ top: savedPos, behavior: "smooth" });
        }
        savedScrollPosition.current = null;
      }, 150);
    }
  };

  const scrollToContact = () => {
    const lenis = getLenis();
    const contactEl = document.getElementById("contact");
    if (lenis && contactEl) {
      lenis.scrollTo(contactEl, { duration: 1.2 });
    } else {
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full text-brand-50 pt-16">
      <ScrollReveal
        direction="down"
        distance={45}
        fade
        fadeOutMode="only-up"
        amount={0.1}
        enterDuration={0.6}
        exitDuration={0.6}
        className="w-full"
        onEnter={() => setActiveNav("usluge")}
        onLeave={() => setActiveNav("home")}
      >
        <div className="relative mx-auto w-full px-6 py-14 overflow-hidden">
          {/* Animated background with emerald overlay */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Color overlay */}
            <motion.div
              className="absolute inset-0 mix-blend-multiply"
              animate={{
                background: isExpanded
                  ? "linear-gradient(to bottom right, rgb(25,85,55), rgb(30,95,62), rgb(22,70,48))"
                  : "linear-gradient(to bottom right, rgb(32,95,62), rgb(38,110,72), rgb(28,80,55))",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Secondary overlay for depth */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isExpanded
                  ? "linear-gradient(to bottom right, rgba(20,70,48,0.85), rgba(25,90,58,0.8), rgba(18,55,40,0.9))"
                  : "linear-gradient(to bottom right, rgba(25,85,55,0.8), rgba(30,100,65,0.75), rgba(20,60,45,0.85))",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Animated radial glow - expands and intensifies when open */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isExpanded
                  ? "radial-gradient(ellipse 120% 80% at 50% 30%, rgba(120,200,150,0.15), transparent)"
                  : "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(100,180,130,0.1), transparent)",
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Light streak effect - shifts when expanded */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isExpanded
                  ? "linear-gradient(145deg, transparent 35%, rgba(255,255,255,0.04) 42%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 58%, transparent 65%)"
                  : "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Subtle vignette that intensifies when expanded */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isExpanded
                  ? "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)"
                  : "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          <div className="flex flex-col gap-10 items-center justify-center">
            {/* Title */}
            <div className="flex flex-col items-center text-center gap-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Najčešće usluge
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl">
              {USLUGE.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-sm backdrop-blur hover:bg-white/15 hover:border-white/30 transition-all duration-200"
                >
                  <div className="text-lg font-semibold text-white">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm md:text-[15px] leading-relaxed text-white/80">
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Expand Button */}
            <motion.button
              onClick={isExpanded ? handleClose : handleExpand}
              aria-expanded={isExpanded}
              aria-controls="usluge-expanded-content"
              className={[
                "inline-flex items-center gap-2 justify-center rounded-full bg-brand-900/70",
                "px-6 py-4 text-lg font-semibold text-white shadow-xl",
                "hover:bg-black transition-colors",
                btnHighlight,
              ].join(" ")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {isExpanded ? "Zatvori" : "Pogledajte sve usluge"}
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </motion.button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id="usluge-expanded-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.3 },
                  }}
                  className="w-full max-w-5xl overflow-hidden"
                >
                  <motion.div
                    ref={expandedContentRef}
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="pt-4 scroll-mt-4"
                  >
                    {/* Section Title */}
                    <h3
                      id="kompletna"
                      className="text-xl font-semibold text-white text-center mb-6"
                    >
                      Kompletna ponuda usluga
                    </h3>

                    {/* Services List */}
                    <div className="space-y-3">
                      {USLUGE_KOMPLETNO.map((usluga, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.15 + index * 0.05,
                            duration: 0.3,
                          }}
                          className="group rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-x-[1.03] hover:rounded-none origin-center"
                        >
                          <div className="flex items-start gap-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-relaxed text-white/90 md:text-base">
                              {usluga}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={scrollToContact}
                        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-lg transition-all hover:shadow-xl cursor-pointer"
                      >
                        Kontaktirajte nas
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleClose}
                        className="rounded-full border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 cursor-pointer"
                      >
                        Zatvori
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollReveal>

      <div className="h-px w-full bg-white/10" />
    </section>
  );
}
