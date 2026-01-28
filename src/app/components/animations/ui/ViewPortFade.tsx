"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;

  /** Slow in (ms) */
  inDurationMs?: number;
  /** Fast out (ms) */
  outDurationMs?: number;

  /** Easing function */
  easing?: string;

  /**
   * Visibility trigger:
   * "center" = section's vertical center is inside viewport (recommended)
   * "intersect" = simple IntersectionObserver intersecting
   */
  mode?: "center" | "intersect";

  /** IntersectionObserver threshold when mode="intersect" */
  threshold?: number;
};

export default function ViewportFade({
  children,
  className = "",
  inDurationMs = 1200,
  outDurationMs = 300,
  easing = "cubic-bezier(0.22,1,0.36,1)",
  mode = "center",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (mode === "intersect") {
      const obs = new IntersectionObserver(
        ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
        { threshold },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }

    // mode === "center" (recommended): stable behavior up/down
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const isVisible = sectionCenter > 0 && sectionCenter < window.innerHeight;
      setVisible(isVisible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, threshold]);

  const duration = visible ? `${inDurationMs}ms` : `${outDurationMs}ms`;

  return (
    <div
      ref={ref}
      className={[
        className,
        "transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        transitionDuration: duration,
        transitionTimingFunction: easing,
      }}
    >
      {children}
    </div>
  );
}
