import WhiteWash from "./ui/WhiteWash";
import HeroSection from "./ui/HeroSection";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-20">
      <div className="h-8 bg-[#1E2939]" />
      <div
        className="absolute top-0 left-0 right-0 h-8 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,41,57,0.85), rgba(30,41,57,0.0))",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 bg-center bg-cover opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(30,41,57,0.25), rgba(30,41,57,0)), url('/registratori-color.png')",
        }}
        aria-hidden="true"
      />
      <WhiteWash />
      <HeroSection />
    </section>
  );
}
