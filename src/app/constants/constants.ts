export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type SiteInfo = Readonly<{
  name: string;
  title: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  pages: {
    home: string;
    about: string;
    services: string;
    location: string;
    contact: string;
  };
}>;

export const SITE_INFO: SiteInfo = {
  name: "Matka d.o.o.",
  title: "Matka d.o.o. – Knjigovodstvene Usluge Zagreb",
  description: "Pouzdane knjigovodstvene usluge za poduzeća svih veličina.",
  address: "Ksaverska cesta 47",
  zip_code: "10000",
  city: "Zagreb",
  country: "Hrvatska",
  pages: {
    home: "Naslovna",
    about: "O nama",
    services: "Usluge",
    location: "Lokacija",
    contact: "Kontakt",
  },
} as const;

export const SERVICES: string[] = [
  "Ustroj i vođenje poslovnih knjiga za male i srednje poduzetnike te neprofitne organizacije",
  "Knjiženje svih potrebnih dokumenata za sastavljanje temeljnih financijskih izvještaja – bilanca, račun dobitka i gubitka, bilješke uz financijske izvještaje",
  "Sastavljanje statističkih izvještaja (kvartalno i godišnje)",
  "Usluge vođenja poreznih evidencija i poreznih prijava te poreznog savjetovanja",
  "Vođenje knjiga ulaznih i izlaznih računa (IRA i URA) te obračun PDV-a",
  "Usluge obračuna plaće; izrada isplatnih lista, virmana, JOPPD obrasca, vođenje evidencija vezanih uz obradu plaća",
  "Obračun autorskih honorara",
  "Vođenje Knjige primitaka i izdataka za obrtnike te izrada godišnje prijave poreza na dohodak",
  "Uvođenjem digitaliziranih procesa u vođenju poslovnih knjiga olakšavamo poslovanje našim korisnicima",
] as const;

export const SEO_KEYWORDS: string[] = [
  "e-račun",
  "e-racun",
  "Knjigovodstvo",
  "Računovodstvo",
  "Računovodstvo Zagreb",
  "Knjigovodstvene usluge",
  "Knjigovodstvene usluge Zagreb",
  "Financijske usluge",
  "Accounting",
  "Matka",
  "Matka doo",
  "Matka d.o.o.",
  "Računovodstvene usluge",
  "Računovodstvo za firme",
  "Porezni savjeti",
  "Porezno savjetovanje",
  "Pomoć u vođenju knjiga",
  "Obračun plaće",
  "Obračun autorskih honorara",
  "Izrada godišnjeg obračuna",
  "Računovodstvo za poduzetnike",
  "Računovodstvo za obrt",
  "Računovodstvo za obrtnike",
  "Računovodstveni savjetnik",
  "Računovodstvo za malo poduzeće",
  "Ustroj i vođenje poslovnih knjiga za male i srednje poduzetnike te neprofitne organizacije",
  "Knjigovodstvo za malo poduzeće",
] as const;

export const STRINGS = {
  footer: {
    all_rights_reserved: "Sva prava pridržana",
  },

  features: {
    experience: {
      title: "30+ godina iskustva",
      description:
        "Knjigovodstvene usluge pružamo od 1994. godine uz dugoročnu suradnju s klijentima.",
    },
    precision: {
      title: "Ažurno i precizno",
      description:
        "Rokovi, obračuni i dokumentacija vode se točno, uredno i bez kašnjenja.",
    },
    individual: {
      title: "Individualni pristup",
      description:
        "Usluge i cijene prilagođavamo vašoj djelatnosti i stvarnim potrebama poslovanja.",
    },
    trust: {
      title: "Diskrecija i povjerenje",
      description:
        "Vaši poslovni podaci tretiraju se s maksimalnom povjerljivošću i sigurnošću.",
    },
    digital: {
      title: "Digitalno poslovanje",
      description: "Digitalna obrada dokumentacije i suvremeni alat.",
    },
    support: {
      title: "Stalna podrška",
      description:
        "Dostupni smo za savjete i pomoć tijekom cijele godine, ne samo u rokovima.",
    },
  },
} as const;

export const ABOUT_TEXT = [
  "Knjigovodstvene usluge pružamo od 1994. godine na zadovoljstvo naših klijenata, od kojih su neki s nama od samih početaka. ",

  "Svojim dugogodišnjim iskustvom i znanjem pružamo sigurnu podršku ažurnim, preciznim i modernim načinom vođenja poslovnih knjiga. ",

  "Individualnim pristupom svakom društvu nastojimo prilagoditi naše usluge i cijene stvarnim potrebama poslovanja. ",

  "Redovito pratimo zakonske propise i promjene kako bi naši klijenti uvijek poslovali u skladu s važećim zakonima. ",

  "Posebnu pažnju posvećujemo diskreciji, točnosti podataka i pravovremenoj komunikaciji s klijentima. ",

  "Naš cilj je dugoročna suradnja temeljena na povjerenju, jasnoći i profesionalnosti. ",
] as const;
