"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE_INFO } from "../constants/constants";
import { NAV_ITEMS } from "../constants/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("home");
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // 1) Route-based active (works for real pages like /usluge)
  useEffect(() => {
    // match the current pathname to a nav item (ignore hash)
    const match =
      NAV_ITEMS.find((item) => item.href === pathname) ??
      (pathname === "/" ? NAV_ITEMS.find((i) => i.id === "home") : undefined);

    if (match) setActive(match.id);
  }, [pathname]);

  // 2) IntersectionObserver only when we're on "/"
  useEffect(() => {
    if (pathname !== "/") return;

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

    // observe sections that exist on the home page
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // 3) Move indicator whenever active changes
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

  return (
    <header className="relative w-full text-brand-50 bg-brand-900/10">
      {/* Background image layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/header_green.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-brand-900/70" />
      </div>

      <div className="h-[2px] w-full bg-white/30" />
      <div className="border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
          {/* Left: logo */}
          <a
            href="/"
            className="justify-self-center md:justify-self-start flex items-center gap-3 px-6 py-3"
          >
            <img
              src="/logo_transparent.svg"
              alt={SITE_INFO.name}
              className="h-24 md:h-32 w-auto md:scale-300 origin-left"
            />
          </a>

          {/* Center: nav */}
          <nav className="relative justify-self-center flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xl pb-4 md:pb-0">
            {/* indicator */}
            <span
              aria-hidden="true"
              className="
              absolute bottom-0 h-[2px]
              bg-white/55
              transition-all duration-slow ease-nobounce
              "
              style={{
                left: indicator.left,
                width: indicator.width,
              }}
            />

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                className="relative z-10 rounded-md px-3 py-2 hover:text-white/60 transition-colors"
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block" />
        </div>
      </div>
    </header>
  );
}
