"use client";

import { useMemo } from "react";
import { useMapInteractionLock } from "../hooks/useMapInteractionLock";

type MapSize = "sm" | "md" | "lg" | "fill";

type Props = {
  src: string;
  className?: string;

  /** Use preset sizing… */
  size?: MapSize;

  /** …or override min height directly (e.g. 520, "70vh") */
  minHeight?: number | string;

  /** Show subtle edge fade like you had */
  fadeEdge?: boolean;

  /** i18n strings */
  enableLabel: string;
  closeLabel: string;

  /** Optional: if you want to disable the global event dispatch in some pages */
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

  // If you want to control whether the hook dispatches the event,
  // simplest is: keep hook as-is and just ignore it where not needed.
  // If you truly need it conditional, we can refactor the hook to accept a flag.

  const heightClass = useMemo(() => {
    if (minHeight != null) return ""; // style will handle it

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

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setIsOverMap(true)}
      onMouseLeave={() => setIsOverMap(false)}
      className={`relative ${heightClass} ${className}`}
      style={style}
    >
      <iframe
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={[
          "absolute inset-0 h-full w-full",
          mapActive ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      />

      {!mapActive && (
        <button
          type="button"
          onClick={() => setMapActive(true)}
          className="absolute inset-0 z-10 grid place-items-center"
          aria-label={enableLabel}
        >
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow">
            {enableLabel}
          </span>
        </button>
      )}

      {mapActive && (
        <button
          type="button"
          onClick={() => setMapActive(false)}
          className="absolute top-3 right-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow"
        >
          {closeLabel}
        </button>
      )}

      {fadeEdge && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/0 to-white/10" />
      )}
    </div>
  );
}
