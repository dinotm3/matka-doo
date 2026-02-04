import UslugeSection from "./ui/UslugeSection";
import LokacijaSection from "./ui/LokacijaSection";
import KontaktSection from "./ui/KontaktSection";

export default function HomeSection() {
  return (
    <section className="relative z-12">
      <div id="usluge" className="scroll-mt-20">
        <UslugeSection />
      </div>
      <div id="location" className="scroll-mt-20">
        <LokacijaSection />
      </div>
      <div id="contact" className="scroll-mt-20">
        <KontaktSection />
      </div>
    </section>
  );
}
