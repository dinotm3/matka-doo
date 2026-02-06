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
    services: "Usluge",
    location: "Lokacija",
    contact: "Kontakt",
  },
} as const;

// Consolidated services list (10 items, digital first)
export const SERVICES_LIST: string[] = [
  "E-računi, digitalna razmjena dokumenata i jednostavnije vođenje poslovnih knjiga",
  "Ustroj i vođenje poslovnih knjiga za d.o.o., j.d.o.o., male i srednje poduzetnike te neprofitne organizacije",
  "Sastavljanje financijskih izvještaja – bilanca, račun dobitka i gubitka, bilješke uz izvještaje te statistički izvještaji (kvartalno i godišnje)",
  "Vođenje knjiga ulaznih i izlaznih računa (URA/IRA), obračun PDV-a, PDV prijave, EU isporuke i kontrola rokova",
  "Vođenje Knjige primitaka i izdataka (KPI/KPR) za obrtnike, obračun poreza i izrada godišnje prijave poreza na dohodak",
  "Obračun plaća – isplatne liste, virmani, JOPPD obrasci i vođenje evidencija vezanih uz obradu plaća",
  "Obračun autorskih honorara",
  "Porezno savjetovanje – vođenje poreznih evidencija, izrada poreznih prijava i poslovna podrška kroz cijelu godinu",
  "Praćenje zakonskih propisa i pravovremeno usklađivanje poslovanja s promjenama u poreznim i računovodstvenim pravilima",
  "Redovita komunikacija i dostupnost za sva pitanja i konzultacije tijekom cijele poslovne godine",
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
    digital: {
      title: "Digitalno poslovanje",
      description: "Digitalna obrada dokumentacije i suvremeni alat.",
    },
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
