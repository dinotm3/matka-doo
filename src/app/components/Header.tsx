"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_INFO } from "../constants/constants";
import { NAV_ITEMS } from "../constants/navigation";
import Link from "next/link";

export default function Header() {
  // default to first nav item
  const [active, setActive] = useState<string>(NAV_ITEMS[0].id);

  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // position indicator
  useEffect(() => {
    const update = () => {
      const el = linkRefs.current[active];
      if (!el) return;

      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <header className="w-full text-brand-50 bg-brand-300">
      <div className="h-[2px] w-full bg-white/50" />
      <div className="border-b border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
          {/* Logo */}
          <Link
            href="/"
            className="justify-self-center md:justify-self-start flex items-center gap-3 px-6 py-3"
          >
            <img
              src="/logo_transparent.svg"
              alt={SITE_INFO.name}
              className="h-24 md:h-32 w-auto md:scale-300 origin-left"
            />
          </Link>

          {/* Nav */}
          <nav className="relative justify-self-center flex justify-center items-center gap-x-6 text-xl pb-4 md:pb-0">
            {/* Moving square */}
            <span
              aria-hidden
              className="absolute rounded-md bg-white/20 transition-all duration-slow ease-bounce"
              style={{
                left: indicator.left,
                width: indicator.width,
                top: 0,
                bottom: 0,
              }}
            />

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                onClick={() => setActive(item.id)}
                className="relative z-10 rounded-md px-3 py-2 hover:bg-white/10 transition-colors"
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
