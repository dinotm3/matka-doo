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
    home: "Home",
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

export interface STRINGS {
  all_rights_reserved: string;
}

export const STRINGS = {
  all_rights_reserved: "Sva prava pridržana",
  trideset_godina_iskustva: "30+ godina iskustva",
  azurno_precizno: "Ažurno i precizno",
  individualni_pristup: "Individualni pristup",
} as const;

export const ABOUT_TEXT: string[] = [
  "Knjigovodstvene usluge pružamo od 1994.g. na zadovoljstvo naših klijenata od kojih su neki od samih početaka s nama.",
  "Svojim dugogodišnjim iskustvom i znanjem pružamo sigurnu podršku ažurnim, preciznim i modernim načinom vođenja poslovnih knjiga.",
  "Individualnim pristupom svakom društvu nastojimo prilagoditi naše usluge i cijene.",
] as const;
