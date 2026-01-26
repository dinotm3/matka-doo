import { HERO } from "@/app/constants/constants";

export default function HeroBanner() {
  return (
    <div className="md:col-span-2 rounded-2xl border border-brand-50 bg-white text-center p-6 shadow-sm flex flex-col justify-center">
      <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-brand-200 -translate-y-3">
        {HERO.bannerFirstRowText}
        <br />
        {HERO.bannerSecondRowText}
      </h1>
    </div>
  );
}
