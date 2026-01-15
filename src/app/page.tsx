import { SITE_INFO, ABOUT_TEXT, STRINGS } from "./constants/constants";
import HighlightBadge from "./components/HighlightBadge";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-gray-900">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-wider text-gray-500">
          ZAGREB • KNJIGOVODSTVO • RAČUNOVODSTVO
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight">O nama</h1>

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
          <HighlightBadge label={STRINGS.azurno_precizno} icon="✅" />
          <HighlightBadge label={STRINGS.individualni_pristup} icon="🤝" />
        </div>
      </div>
    </main>
  );
}
