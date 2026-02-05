export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type SiteInfo = Readonly<{
  name: string;
  title: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  email: string;
  phone: string;
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
  email: "matka@knjigovodstvo-matka.hr",
  phone: "+38514673751",
  pages: {
    home: "Naslovna",
    about: "O nama",
    services: "Usluge",
    location: "Lokacija",
    contact: "Kontakt",
  },
} as const;

export const USLUGE_KOMPLETNO: string[] = [
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

export const USLUGE = [
  {
    title: "Digitalno poslovanje",
    desc: "e-računi, digitalna razmjena dokumenata i jednostavniji procesi.",
  },
  {
    title: "d.o.o. / j.d.o.o.",
    desc: "Glavna knjiga, usklađenja, završni račun i financijski izvještaji.",
  },
  {
    title: "Obrti",
    desc: "KPI/KPR, obračun poreza, PDV (po potrebi) i godišnje prijave.",
  },
  {
    title: "PDV",
    desc: "Knjige URA/IRA, PDV prijave, EU isporuke i kontrola rokova.",
  },
  {
    title: "Plaće i JOPPD",
    desc: "Obračun plaća, isplatne liste, JOPPD i evidencije radnika.",
  },
  {
    title: "Savjetovanje",
    desc: "Porezni i poslovni savjeti, optimizacija troškova i podrška kroz godinu.",
  },
  {
    title: "URA / IRA",
    desc: "Knjiženje ulaznih i izlaznih računa, priprema dokumentacije i arhiva.",
  },
  {
    title: "Završni račun",
    desc: "Bilanca, RDG i bilješke uz izvještaje – predaja na vrijeme i bez stresa.",
  },
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
    digital: {
      title: "Digitalno poslovanje",
      description: "Digitalna obrada dokumentacije i suvremeni alat.",
    },
    trust: {
      title: "Diskrecija i povjerenje",
      description:
        "Vaši poslovni podaci tretiraju se s maksimalnom povjerljivošću i sigurnošću.",
    },
    individual: {
      title: "Individualni pristup",
      description:
        "Usluge i cijene prilagođavamo vašoj djelatnosti i stvarnim potrebama poslovanja.",
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

export const LOKACIJA = {
  title: "Lokacija ureda",
  description:
    "Nalazimo se u Zagrebu. Dostupni smo za osobni dolazak uz prethodnu najavu, ali i potpuno digitalnu suradnju.",
  adresa: "Ksaverska cesta 47, 10000 Zagreb",
  strings: {
    adresa: "Adresa:",
    radno_vrijeme_title: "Radno vrijeme:",
    radno_vrijeme: "Pon–Pet, 8:00–16:00",
    email: "Email:",
    telefon: "Telefon:",
    sastanak_part_1: "Dogovorite sastanak ",
    sastanak_part_2: "ili postavite pitanje",
    interakcija_karta: "Kliknite za interakciju s kartom",
    zatvori_mapu: "Zatvori mapu",
  },
  embedURL:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.947340492939!2d15.975098876723617!3d45.832336508800175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d7136b54af43%3A0xcd2ebb0482af9f48!2sKnjigovodstvo%20Matka!5e0!3m2!1shr!2shr!4v1769009498430!5m2!1shr!2shr",
};

export const HERO = {
  title: "Knjigovodstvene usluge - osnovani 1994. godine",
  bannerFirstRowText: "Vi vodite posao",
  bannerSecondRowText: "Mi pazimo na brojk",
};

export const KONTAKT = {
  title: "Kontakt",
  subtitle: "Postavite pitanje ili dogovorite sastanak",
  description:
    "Ispunite obrazac i mi ćemo vas kontaktirati u najkraćem vremenu. Možete također pozvati ili pisati direktno.",
  strings: {
    email: "Email:",
    telefon: "Telefon:",
    adresa: "Adresa:",
    radno_vrijeme: "Radno vrijeme:",
    radno_vrijeme_value: "Pon–Pet, 8:00–16:00",
    field_ime: "Ime i prezime",
    field_email: "E-mail",
    field_telefon: "Telefon",
    field_poruka: "Poruka",
    placeholder_ime: "npr. Ivana Horvatić",
    placeholder_email: "vaš@email.com",
    placeholder_telefon: "+385 1 234 5678",
    placeholder_poruka: "Napišite vaše pitanje ili zahtjev…",
    submit: "Pošalji poruku",
    success_title: "Poruka primljena!",
    success_body: "Mi ćemo vas kontaktirati u najkraćem vremenu.",
  },
} as const;
