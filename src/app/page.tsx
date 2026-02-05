import Hero from "./components/ui/sections/hero/HeroLayout";
import HomeSection from "./components/ui/sections/HomeSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      {/* Global texture background for white areas */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/white_bg.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <Hero />
      <HomeSection />
    </div>
  );
}
