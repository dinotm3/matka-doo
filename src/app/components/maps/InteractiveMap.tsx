"use client";

import { useEffect, useMemo } from "react";
import { useMapInteractionLock } from "../hooks/useMapInteractionLock";

type MapSize = "sm" | "md" | "lg" | "fill";

type Props = {
  src: string;
  className?: string;

  size?: MapSize;
  minHeight?: number | string;

  fadeEdge?: boolean;

  enableLabel: string;
  closeLabel: string;

  dispatchActiveEvent?: boolean;
};

export default function InteractiveMap({
  src,
  className = "",
  size = "md",
  minHeight,
  fadeEdge = true,
  enableLabel,
  closeLabel,
  dispatchActiveEvent = true,
}: Props) {
  const { wrapRef, mapActive, setMapActive, setIsOverMap } =
    useMapInteractionLock<HTMLDivElement>();

  const heightClass = useMemo(() => {
    if (minHeight != null) return "";

    switch (size) {
      case "sm":
        return "min-h-[280px]";
      case "md":
        return "min-h-[360px]";
      case "lg":
        return "min-h-[520px]";
      case "fill":
        return "min-h-full";
      default:
        return "min-h-[360px]";
    }
  }, [size, minHeight]);

  const style = useMemo<React.CSSProperties>(() => {
    if (minHeight == null) return {};
    return {
      minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
    };
  }, [minHeight]);

  // 🔑 Deactivate map when user scrolls ABOVE it
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();

      // if the map is fully above the viewport, deactivate
      if (rect.bottom < 0) {
        setMapActive(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setMapActive, wrapRef]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => {
        setIsOverMap(true);
        setMapActive(true);
      }}
      onMouseLeave={() => {
        setIsOverMap(false);
        // IMPORTANT: do NOT deactivate here
      }}
      className={`relative ${heightClass} ${className}`}
      style={style}
    >
      {/* MAP */}
      <iframe
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={[
          "absolute inset-0 h-full w-full transition-transform duration-300",
          mapActive ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      />

      {/* DARK OVERLAY WHEN INACTIVE */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-0 z-10
          bg-gradient-to-t from-black/55 via-black/30 to-black/15
          transition-opacity duration-300
          ${mapActive ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* OPTIONAL EDGE FADE (unchanged) */}
      {fadeEdge && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/0 to-white/10" />
      )}
    </div>
  );
}
