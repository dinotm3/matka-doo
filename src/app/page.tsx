import dynamic from "next/dynamic";
import Hero from "./components/ui/sections/hero/HeroLayout";
import Image from "next/image";

const HomeSection = dynamic(
  () => import("./components/ui/sections/HomeSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="relative">
      {/* Global texture background for white areas */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/white_bg.webp"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          quality={50}
          priority
          fetchPriority="high"
        />
      </div>

      <Hero />
      <HomeSection />
    </div>
  );
}
