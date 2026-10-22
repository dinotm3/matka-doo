import UslugeSection, { UslugeSpacer } from "./UslugeSection";
import KontaktLokacijaSection from "./KontaktLokacijaSection";
import PovjerenjeSection from "./PovjerenjeSection";

export default function HomeSection() {
  return (
    <section className="relative z-12">
      <div id="usluge" className="scroll-mt-20">
        <UslugeSection />
      </div>
      <UslugeSpacer />
      <PovjerenjeSection />
      <div id="location" className="scroll-mt-20">
        <KontaktLokacijaSection />
      </div>
    </section>
  );
}
