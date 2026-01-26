"use client";

import { useEffect, useRef, useState } from "react";

export function useMapInteractionLock<T extends HTMLElement>() {
  const wrapRef = useRef<T | null>(null);

  const [mapActive, setMapActive] = useState(false);
  const [isOverMap, setIsOverMap] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("map-active-change", { detail: { active: mapActive } }),
    );
  }, [mapActive]);

  useEffect(() => {
    if (!mapActive) return;

    const onPointerDown = (ev: MouseEvent | TouchEvent) => {
      const target = ev.target as Node | null;
      if (!target) return;

      const wrap = wrapRef.current;
      if (wrap && !wrap.contains(target)) setMapActive(false);
    };

    const onWheel = () => {
      if (!isOverMap) setMapActive(false);
    };

    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
      window.removeEventListener("wheel", onWheel as any);
    };
  }, [mapActive, isOverMap]);

  return { wrapRef, mapActive, setMapActive, setIsOverMap };
}
