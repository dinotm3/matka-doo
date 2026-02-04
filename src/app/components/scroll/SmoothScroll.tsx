"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 0.7,
    });

    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    // Keep Lenis in sync with layout changes (expands, fonts, images, transitions)
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => lenis.resize());
    });
    ro.observe(document.body);

    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;

      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);

      ro.disconnect();
      lenis.destroy();

      if ((window as any).lenis === lenis) (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
