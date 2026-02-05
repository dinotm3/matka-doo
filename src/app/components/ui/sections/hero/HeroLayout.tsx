import HeroSection from "./HeroSection";

export default function HeroLayout() {
  return (
    <section id="home" className="relative w-full pt-12 overflow-hidden">
      <main className="mx-auto max-w-7xl">
        <HeroSection />
      </main>
    </section>
  );
}
