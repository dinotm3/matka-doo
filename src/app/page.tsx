import { ABOUT_TEXT, STRINGS } from "./constants/constants";
import HighlightBadge from "./components/HighlightBadge";

export default function Home() {
  return (
    // SECTION = background lives here
    <section className="relative w-full overflow-hidden py-20">
      <div className="h-8 bg-[#1E2939]" />
      {/* gradient bridge from header */}
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

      {/* CONTENT */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 text-gray-900">
        <div className="rounded-2xl border border-[rgb(var(--brand-50))] bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-wider text-gray-500">
            ZAGREB • KNJIGOVODSTVO • RAČUNOVODSTVO
          </p>
          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-700">
            {ABOUT_TEXT.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <HighlightBadge
              label={STRINGS.trideset_godina_iskustva}
              icon="/icon_chart.svg"
            />
            <HighlightBadge
              label={STRINGS.azurno_precizno}
              icon="/icon_precision.svg"
            />
            <HighlightBadge
              label={STRINGS.individualni_pristup}
              icon="/icon_handshake.svg"
            />
          </div>
        </div>
      </main>
    </section>
  );
}
