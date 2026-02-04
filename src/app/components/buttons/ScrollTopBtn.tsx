"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";

export default function ScrollTopBtn({
  className = "fixed bottom-6 right-6 z-[9999]",
}: {
  className?: string;
}) {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      className={[
        className, // ✅ position controlled by parent
        "h-16 w-16 rounded-full",
        "bg-brand-900 text-white shadow-lg",
        "grid place-items-center",
        "text-3xl font-bold",
        "cursor-pointer",
        "transition-all duration-200 ease-out",
        "hover:bg-brand-900/70 hover:scale-110 hover:-translate-y-1",
        "active:scale-95 active:translate-y-0",
        showUp ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      ↑
    </button>
  );
}
