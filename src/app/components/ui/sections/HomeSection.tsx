import UslugeSection from "./UslugeSection";
import KontaktLokacijaSection from "./KontaktLokacijaSection";

export default function HomeSection() {
  return (
    <section className="relative z-12">
      <div id="usluge" className="scroll-mt-20">
        <UslugeSection />
      </div>
      <div id="location" className="scroll-mt-20">
        <KontaktLokacijaSection />
      </div>
    </section>
  );
}
