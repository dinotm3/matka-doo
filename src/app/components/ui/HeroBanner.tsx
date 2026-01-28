import { HERO } from "@/app/constants/constants";

export default function HeroBanner() {
  return (
    <div className="md:col-span-2 rounded-2xl text-center p-6 flex flex-col justify-center">
      <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-black -translate-y-3">
        {HERO.bannerFirstRowText}
        <br />
        <span className="text-brand-900">Mi</span> <span>pazimo na brojke</span>
      </h1>
    </div>
  );
}
