"use client";

import { useEffect, useState } from "react";
import { btnHighlight } from "../../constants/uiClasses";

export default function ScrollTopBtn() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 1200); // adjust threshold

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      className={[
        "absolute bottom-6 right-6 z-50",
        "h-16 w-16 rounded-full",
        "bg-brand-300 text-white shadow-lg",
        "grid place-items-center",
        "text-3xl font-bold",
        btnHighlight,
        showUp
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      ↑
    </button>
  );
}
