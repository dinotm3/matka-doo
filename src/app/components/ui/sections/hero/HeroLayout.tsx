import HeroSection from "./HeroSection";
import Image from "next/image";

export default function HeroLayout() {
  return (
    <section id="home" className="relative w-full pt-6 lg:pt-12 overflow-hidden">
      {/* Background images - left half */}
      <div className="absolute left-0 top-0 w-1/2 h-[280px] sm:h-[320px] lg:h-[420px] -z-10">
        <Image
          src="/calculator.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-right"
          priority
          sizes="50vw"
          quality={65}
        />
        {/* Gradient fade towards center */}
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent" />
      </div>

      {/* Background images - right half */}
      <div className="absolute right-0 top-0 w-1/2 h-[280px] sm:h-[320px] lg:h-[420px] -z-10">
        <Image
          src="/registratori_side_image.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-left"
          priority
          sizes="50vw"
          quality={65}
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
