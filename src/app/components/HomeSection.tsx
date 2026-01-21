import UslugeSection from "./ui/UslugeSection";
import LokacijaSection from "./ui/LokacijaSection";

export default function HomeSection() {
  return (
    <section className="relative z-10">
      <div id="snap-usluge" className="scroll-mt-20">
        <UslugeSection />
      </div>
      <div id="snap-location" className="scroll-mt-20">
        <LokacijaSection />
      </div>
    </section>
  );
}
