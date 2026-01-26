// app/hooks/useScrollProgress.ts
"use client";

import { useEffect, useRef, useState } from "react";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

type Options = {
  start?: number; // when animation starts (0..1 of viewport)
  end?: number; // when animation ends (0..1 of viewport)
  freeze?: boolean; // if true: keep last progress
  snapToOneAfter?: number; // e.g. 0.98 => lock to 1
};

export function useScrollProgress<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  opts: Options = {},
) {
  const {
    start = 0.8,
    end = 0.92,
    freeze = false,
    snapToOneAfter = 0.98,
  } = opts;

  const rafRef = useRef<number | null>(null);
  const lastPRef = useRef(0);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      rafRef.current = null;

      if (freeze) {
        setP(lastPRef.current);
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const raw = (vh - rect.top) / vh;
      let t = clamp01((raw - start) / (end - start));
      t = easeOutCubic(t);

      if (t > snapToOneAfter) t = 1;

      lastPRef.current = t;
      setP(t);
    };

    const onScrollOrResize = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ref, start, end, freeze, snapToOneAfter]);

  return p;
}
