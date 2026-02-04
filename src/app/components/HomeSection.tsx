import UslugeSection from "./ui/UslugeSection";
import KontaktLokacijaSection from "./ui/KontaktLokacijaSection";

export default function HomeSection() {
  return (
    <section className="relative z-12">
      <div id="usluge" className="scroll-mt-20">
        <UslugeSection />
      </div>
      <div>
        <KontaktLokacijaSection />
      </div>
    </section>
  );
}
