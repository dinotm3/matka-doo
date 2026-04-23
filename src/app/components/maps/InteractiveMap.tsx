"use client";

import { useMemo } from "react";
import { useMapInteractionLock } from "../../hooks/useMapInteractionLock";

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

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => {
        setIsOverMap(true);
        setMapActive(true);
      }}
      onMouseLeave={() => {
        setIsOverMap(false);
        setMapActive(false);
      }}
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

      {fadeEdge && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/0 to-white/10" />
      )}
    </div>
  );
}
