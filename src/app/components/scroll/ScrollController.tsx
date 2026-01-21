"use client";

import { useEffect, useRef } from "react";

function smoothScrollTo(y: number) {
  window.scrollTo({ top: y, behavior: "smooth" });
}

function scrollSectionBottomToViewportBottom(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const elTop = rect.top + window.scrollY;
  const elBottom = elTop + rect.height;

  const target = elBottom - window.innerHeight;
  smoothScrollTo(Math.max(0, target));
}

function scrollToPageBottom() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: Math.max(0, max), behavior: "smooth" });
}

export default function ScrollController() {
  const stepRef = useRef(0); // 0=hero/top, 1=usluge, 2=location
  const lockedRef = useRef(false);
  const touchpadAccum = useRef(0);
  const mapActiveRef = useRef(false);
  const mapHoverRef = useRef(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(pointer:fine)").matches;
    if (!isDesktop) return;

    // ✅ listen ONCE for map-active-change
    const onMapActive = (ev: Event) => {
      const e = ev as CustomEvent<{ active?: boolean }>;
      mapActiveRef.current = !!e.detail?.active;
      lockedRef.current = false;
      touchpadAccum.current = 0;
    };

    const onMapHover = (ev: Event) => {
      const e = ev as CustomEvent<{ hover?: boolean }>;
      mapHoverRef.current = !!e.detail?.hover;
    };
    window.addEventListener("map-active-change", onMapActive as EventListener);
    window.addEventListener("map-hover-change", onMapHover as EventListener);

    const lock = () => {
      lockedRef.current = true;
      window.setTimeout(() => {
        lockedRef.current = false;
        touchpadAccum.current = 0;
      }, 900);
    };

    const go = (step: number) => {
      stepRef.current = Math.max(0, Math.min(2, step));

      if (stepRef.current === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (stepRef.current === 1) {
        scrollSectionBottomToViewportBottom("snap-usluge");
      } else {
        scrollToPageBottom();
      }

      lock();
    };

    const onWheel = (e: WheelEvent) => {
      // ✅ Only let the map consume wheel if:
      // map is active AND mouse is over the map
      if (mapActiveRef.current && mapHoverRef.current) {
        return; // don't preventDefault, allow iframe zoom
      }

      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

      touchpadAccum.current += e.deltaY;

      const threshold = 80;
      if (Math.abs(touchpadAccum.current) < threshold) {
        e.preventDefault();
        return;
      }

      const dir = touchpadAccum.current > 0 ? 1 : -1;
      touchpadAccum.current = 0;

      e.preventDefault();
      go(stepRef.current + dir);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    // Keep step in sync if user drags scrollbar
    const onScroll = () => {
      if (lockedRef.current) return;

      const y = window.scrollY;

      const us = document.getElementById("snap-usluge");
      const loc = document.getElementById("snap-location");
      if (!us || !loc) return;

      const usTop = us.getBoundingClientRect().top + window.scrollY;
      const locTop = loc.getBoundingClientRect().top + window.scrollY;

      if (y + 10 < usTop) stepRef.current = 0;
      else if (y + 10 < locTop) stepRef.current = 1;
      else stepRef.current = 2;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(
        "map-active-change",
        onMapActive as EventListener,
      );
      window.removeEventListener(
        "map-hover-change",
        onMapHover as EventListener,
      );
    };
  }, []);

  return null;
}
