type SiteInfo = Readonly<{
    NAME: string;
    TITLE: string;
    DESCRIPTION: string;
    ADDRESS: string;
    ZIP_CODE: string,
    CITY: string,
    COUNTRY: string,
    PAGES: {
        HOME: string;
        ABOUT: string;
        SERVICES: string;
        LOCATION: string;
      };
  }>;
  
export const CONST: SiteInfo  = {
    NAME: "Matka d.o.o.",
    TITLE: "Matka d.o.o. – Knjigovodstvene Usluge Zagreb",
    DESCRIPTION: "Pouzdane knjigovodstvene usluge za poduzeća svih veličina u Zagrebu. Obratite nam se za profesionalnu podršku.", 
    ADDRESS: "Ksaverska cesta 47",
    ZIP_CODE: "10000",
    CITY: "Zagreb",
    COUNTRY: "Hrvatska",
    PAGES: {
        HOME: "Home",
        ABOUT: "O nama",
        SERVICES: "Usluge",
        LOCATION: "Lokacija",
    }
} as const;

export const SERVICES: string[] = [  
    "Knjiženje svih potrebnih dokumenata za sastavljanje temeljnih financijskih izvještaja – bilanca, račun dobitka i gubitka, bilješke uz financijske izvještaje",
    "Sastavljanje statističkih izvještaja (kvartalno i godišnje)",
    "Usluge vođenja poreznih evidencija i poreznih prijava te poreznog savjetovanja",
    "Vođenje knjiga ulaznih i izlaznih računa (IRA i URA) te obračun PDV-a",
    "Usluge obračuna plaće; izrada isplatnih lista, virmana, RS-obrasca, ID-obrasca; vođenje evidencija vezanih uz obradu plaća",
    "Obračun autorskih honorara",
    "Knjiigovodstveno praćenje deviznog poslovanja; vođenje nadzornih knjiga",
    "Vještačenje u knjigovodstveno-financijskom poslovanju"
] as const;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
