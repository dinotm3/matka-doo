import { ABOUT_TEXT, STRINGS } from "./constants/constants";
import FeatureCard from "./components/FeatureCard";
import AccountingStory from "./components/animations/accounting-story/AccountingStory";
import UslugeSection from "./components/UslugeSection";
import LokacijaSection from "./components/LokacijaSection";
export default function Home() {
  function getFeatureIcon(title: string) {
    switch (title) {
      case STRINGS.features.experience.title:
        return "/icon_chart.svg";
      case STRINGS.features.precision.title:
        return "/icon_precision.svg";
      case STRINGS.features.digital.title:
        return "💬";
      case STRINGS.features.trust.title:
        return "🔒";
      case STRINGS.features.individual.title:
        return "/icon_handshake.svg";
      case STRINGS.features.support.title:
        return "🧾";
      default:
        return "•";
    }
  }

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

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(30,41,57,0.25), rgba(30,41,57,0)), url('/registratori.png')",
        }}
        aria-hidden="true"
      />

      {/* WHITE WASH OVER IMAGE */}
      <div className="absolute inset-0 z-[1] bg-white/10" aria-hidden="true" />

      {/* HERO CONTENT (capped width) */}
      <main className="relative z-10 mx-auto max-w-7xl px-8 text-gray-900 pb-16">
        <div className="inline-block rounded-xl bg-white/80 px-6 py-4">
          <h2 className="mt-1 text-4xl font-bold tracking-tight text-brand-200 text-center">
            Knjigovodstvene usluge - osnovani 1994. godine
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl border border-brand-50 bg-white text-center p-6 shadow-sm flex flex-col justify-center">
              <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-brand-200 -translate-y-3">
                Vi vodite posao
                <br />
                Mi pazimo na brojke
              </h1>
            </div>

            <div className="rounded-2xl border border-brand-50 bg-white p-6 shadow-sm">
              <AccountingStory />
            </div>
          </div>

          <div className="mt-12 grid gap-x-4 gap-y-8 md:grid-cols-3">
            {Object.values(STRINGS.features).map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={getFeatureIcon(feature.title)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* FULL-WIDTH BAND (not capped) */}
      <div className="relative z-10">
        <UslugeSection />
        <LokacijaSection />
      </div>
    </section>
  );
}
