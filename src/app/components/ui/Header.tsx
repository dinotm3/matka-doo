"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../../constants/navigation";
import { useNav } from "../../context/NavContext";
import Image from "next/image";
import type Lenis from "lenis";

export default function Header() {
  const { activeNav: active, setActiveNav: setActive, navigateTo } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
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
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
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
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, { duration: 1.2, offset: -headerOffset });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
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
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
        <a
          href="/"
          aria-label="Matka - Naslovna stranica"
          className="mt-2 justify-self-center md:justify-self-start flex items-center px-6 h-16"
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
        <nav aria-label="Glavna navigacija" className="relative justify-self-center flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-l pb-4 md:pb-0">
          <span
            aria-hidden="true"
            className="absolute bottom-0 h-[2px] bg-brand-900 transition-all duration-slow ease-bounce"
            style={{ left: indicator.left, width: indicator.width }}
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

        <div className="hidden md:block" />
      </div>

      {/* Green bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-900" />
    </header>
  );
}
