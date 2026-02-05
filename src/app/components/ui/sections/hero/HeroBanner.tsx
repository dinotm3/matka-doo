"use client";

import { HERO, SITE_INFO } from "@/app/constants/constants";

function Euro() {
  const sharpStyle = {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textRendering: "geometricPrecision",
  } as React.CSSProperties;

  return (
    <span
      className="relative inline-block text-brand-900 animate-euro-premium"
      style={sharpStyle}
    >
      {/* Glow layer */}
      <span
        className="absolute inset-0 text-brand-900 animate-euro-glow"
        aria-hidden="true"
      >
        €
      </span>
      {/* Shimmer layer */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%] animate-euro-shimmer bg-clip-text"
        aria-hidden="true"
        style={{ WebkitBackgroundClip: "text", ...sharpStyle }}
      >
        €
      </span>
      {/* Main € */}
      <span className="relative" style={sharpStyle}>€</span>
    </span>
  );
}

export default function HeroBanner() {
  const text = HERO.bannerSecondRowText;
  const euroIndex = text.lastIndexOf("€");
  return (
    <div className="text-center">
      {/* Brand badge */}
      <span className="inline-block text-sm font-semibold text-brand-900 bg-brand-900/10 px-4 py-1.5 rounded-full">
        {HERO.title}
      </span>

      {/* Headline */}
      <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight">
        <span className="text-black md:whitespace-nowrap">
          <span className="text-brand-900">
            {" "}
            {HERO.bannerFirstRowText.split(" ")[0]}
          </span>{" "}
          {HERO.bannerFirstRowText.split(" ").slice(1).join(" ")}
          <br />
          {HERO.bannerSecondRowText}
          <Euro />
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
        {SITE_INFO.description}
      </p>
    </div>
  );
}
