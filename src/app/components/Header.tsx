"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../constants/navigation";
import Image from "next/image";

export default function Header() {
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Sync active tab from URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
      setActive(hash);
    }
  }, []);

  // Shadow appears once scrolled past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver – highlights the nav item for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.2, 0.3, 0.4, 0.5] },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-white border-b border-gray-100 overflow-hidden relative",
        "transition-shadow duration-300",
        scrolled ? "shadow-xl" : "shadow-none",
      ].join(" ")}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
        <a
          href="/"
          className="mt-2 justify-self-center md:justify-self-start flex items-center px-6 h-16"
          onClick={(e) => {
            e.preventDefault();
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
        <nav className="relative justify-self-center flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-l pb-4 md:pb-0">
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
                setActive(item.id);
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
