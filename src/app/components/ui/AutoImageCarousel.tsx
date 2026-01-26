"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
};

type Props = {
  images: CarouselImage[];
  /** ms */
  interval?: number;
  /** Optional: set fixed height (px) for the card area */
  height?: number;
  className?: string;
};

export default function AutoImageCarousel({
  images,
  interval = 2800,
  height = 320,
  className = "",
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [safeImages.length, interval]);

  if (safeImages.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      style={{ height }}
      aria-label="Auto image carousel"
    >
      {safeImages.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className={[
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* subtle overlay to keep it consistent with your design */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
    </div>
  );
}
