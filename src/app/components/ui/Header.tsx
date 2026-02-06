"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../../constants/navigation";
import { useNav } from "../../context/NavContext";
import Image from "next/image";
import type Lenis from "lenis";

export default function Header() {
  const { activeNav: active, setActiveNav: setActive, navigateTo, setForceExpanded } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  // Premium header state: apply glass styling whenever NOT at the top anymore
  useEffect(() => {
    const THRESHOLD = 12;

    const onScroll = () => {
      setScrolled(window.scrollY > THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync active tab from URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
      setActive(hash);
    }
  }, [setActive]);

  // Ensure home is active when at top of page
  useEffect(() => {
    const handleTopCheck = () => {
      if (window.scrollY < 100) {
        setActive("home");
      }
    };
    window.addEventListener("scroll", handleTopCheck, { passive: true });
    return () => window.removeEventListener("scroll", handleTopCheck);
  }, [setActive]);

  // Animate the indicator bar to follow the active link
  useEffect(() => {
    const update = () => {
      const el = linkRefs.current[active];
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const scrollTo = (id: string) => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    const headerOffset = 80; // Account for sticky header

    if (id === "home") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // For usluge, scroll to the title instead of the section top
    const targetId = id === "usluge" ? "usluge-title" : id;
    const element = document.getElementById(targetId);
    if (!element) return;

    // Force-expand the usluge expandable content via React state so that
    // Framer Motion stops controlling maxHeight/opacity and Lenis can
    // calculate the correct target position for sections below it.
    const needsExpand = id === "location" || id === "contact" || id === "usluge";
    if (needsExpand) {
      setForceExpanded(true);
    }

    // Wait two frames for React to re-render and browser to reflow
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.resize(); // recalculate after layout change
          lenis.scrollTo(element, {
            duration: 1.2,
            offset: -headerOffset,
            onComplete: () => {
              // Remove override — by now scroll progress will keep it expanded
              if (needsExpand) setForceExpanded(false);
            },
          });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
          if (needsExpand) setForceExpanded(false);
        }
      });
    });
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full overflow-hidden relative",
        "transition-all duration-300",
        // Top vs scrolled styling
        scrolled
          ? [
              "bg-white/70 backdrop-blur-md",
              "border-b border-black/10",
              "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
            ].join(" ")
          : "bg-white border-b border-gray-100 shadow-none",
      ].join(" ")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 lg:gap-0">
        <a
          href="/"
          aria-label="Matka - Naslovna stranica"
          className="mt-2 justify-self-center lg:justify-self-start flex items-center px-6 h-16"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("home");
            scrollTo("home");
          }}
        >
          <Image
            src="/logo_green.svg"
            alt="Matka"
            width={500}
            height={520}
            className="h-50 w-auto"
            priority
          />
        </a>

        {/* Nav */}
        <nav aria-label="Glavna navigacija" className="relative justify-self-center flex justify-center items-center gap-x-4 sm:gap-x-6 text-l pb-4 lg:pb-0">
          <span
            aria-hidden="true"
            className={`absolute bottom-0 h-[2px] bg-brand-900 ${indicator.ready ? 'transition-all duration-slow ease-bounce' : ''}`}
            style={{
              left: indicator.left,
              width: indicator.width,
              visibility: indicator.ready ? 'visible' : 'hidden'
            }}
          />

          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => {
                linkRefs.current[item.id] = el;
              }}
              className="relative z-10 rounded-md px-3 py-2 text-brand-900 hover:text-brand-800 font-bold transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.id);
                scrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block" />
      </div>

      {/* Green bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-900" />
    </header>
  );
}
