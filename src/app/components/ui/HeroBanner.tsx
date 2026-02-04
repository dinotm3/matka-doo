import { HERO, SITE_INFO } from "@/app/constants/constants";
import { btnHighlight } from "@/app/constants/uiClasses";

export default function HeroBanner() {
  return (
    <div className="text-center">
      {/* Brand badge */}
      <span className="inline-block text-sm font-semibold text-brand-900 bg-brand-900/10 px-4 py-1.5 rounded-full">
        {HERO.title}
      </span>

      {/* Headline */}
      <h1 className="mt-3 text-5xl md:text-7xl font-bold tracking-tight text-black leading-tight">
        {HERO.bannerFirstRowText},
        <br />
        <span className="text-black md:whitespace-nowrap">
          <span className="text-green-800">
            {HERO.bannerSecondRowText.split(" ")[0]}
          </span>{" "}
          {HERO.bannerSecondRowText.split(" ").slice(1).join(" ")}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
        {SITE_INFO.description}
      </p>
    </div>
  );
}
