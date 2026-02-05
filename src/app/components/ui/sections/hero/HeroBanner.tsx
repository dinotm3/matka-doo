"use client";

import { HERO, SITE_INFO } from "@/app/constants/constants";
import { btnHighlight } from "@/app/constants/uiClasses";
import { useState, useEffect } from "react";

function Euro() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`text-brand-900 inline-block transition-transform duration-[1800ms] ease-in-out ${
        pulse ? "scale-130" : "scale-100"
      }`}
    >
      €
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
