export default function UslugeSection() {
  const usluge = [
    { title: "Obrti", desc: "Knjigovodstvo, PDV i izvještaji." },
    {
      title: "d.o.o. / j.d.o.o.",
      desc: "Cjelovito računovodstvo i usklađenja.",
    },
    { title: "Plaće i JOPPD", desc: "Obračuni, prijave i evidencije." },
    { title: "PDV", desc: "Evidencije, prijave i kontrola rokova." },
    { title: "URA / IRA", desc: "Uredna dokumentacija i priprema." },
    { title: "Savjetovanje", desc: "Jasni odgovori i podrška kroz godinu." },
    { title: "Digitalno poslovanje", desc: "e-račun." },
  ];

  return (
    <section className="w-full bg-brand-300 text-brand-50">
      <div className="mx-auto w-full px-6 pt-4 py-16">
        <div className="flex flex-col gap-10">
          {/* Title */}
          <div className="flex flex-col items-center text-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Najčešće usluge za obrte i trgovačka društva.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            {usluge.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-sm backdrop-blur"
              >
                <div className="font-semibold text-white">{s.title}</div>
                <div className="mt-1 text-sm text-white/80">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Button: below on mobile, right on md+ */}
          <div className="order-last md:order-none flex justify-center">
            <a
              href="/usluge"
              className="inline-flex items-center justify-center rounded-md bg-white/15 px-4 py-2 text-brand-50 hover:bg-white/25 transition"
            >
              Pogledajte sve usluge
            </a>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />
    </section>
  );
}
