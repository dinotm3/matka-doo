"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Skip smooth scroll on touch/mobile devices — native scroll is better
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Defer Lenis initialization to avoid blocking main thread during load
    const init = () => {
      import("lenis").then(({ default: Lenis }) => {
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

        // Keep Lenis in sync with layout changes
        const ro = new ResizeObserver(() => {
          requestAnimationFrame(() => lenis.resize());
        });
        ro.observe(document.body);

        const onResize = () => lenis.resize();
        window.addEventListener("resize", onResize);

        // Store cleanup for unmount
        (window as any).__lenisCleanup = () => {
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = null;
          window.removeEventListener("resize", onResize);
          ro.disconnect();
          lenis.destroy();
          if ((window as any).lenis === lenis) {
            (window as any).lenis = undefined;
          }
        };
      });
    };

    // Use requestIdleCallback to defer initialization after critical rendering
    if ("requestIdleCallback" in window) {
      (window as any).__lenisIdleId = requestIdleCallback(init);
    } else {
      setTimeout(init, 100);
    }

    return () => {
      if ((window as any).__lenisIdleId) {
        cancelIdleCallback((window as any).__lenisIdleId);
      }
      (window as any).__lenisCleanup?.();
    };
  }, []);

  return <>{children}</>;
}
