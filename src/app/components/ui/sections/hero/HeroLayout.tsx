import HeroSection from "./HeroSection";
import Image from "next/image";

export default function HeroLayout() {
  return (
    <section id="home" className="relative w-full pt-12 overflow-hidden">
      {/* Full-width background images - left half */}
      <div className="hidden md:block absolute left-0 top-0 w-1/2 h-[420px] -z-10">
        <Image
          src="/calculator.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-right"
          priority
          quality={90}
        />
        {/* Gradient fade towards center */}
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent" />
      </div>

      {/* Full-width background images - right half */}
      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-[420px] -z-10">
        <Image
          src="/registratori_side_image.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-left"
          priority
          quality={90}
        />
        {/* Gradient fade towards center */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
      </div>

      <main className="mx-auto max-w-7xl relative">
        <HeroSection />
      </main>
    </section>
  );
}
