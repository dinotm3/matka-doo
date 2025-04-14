type SiteInfo = Readonly<{
    NAME: string;
    TITLE: string;
    DESCRIPTION: string;
    ADDRESS: string;
    URL: string;
    TEST_URL: string;
  }>;
  
export const CONST: SiteInfo  = {
    NAME: "Matka d.o.o.",
    TITLE: "Matka d.o.o. – Knjigovodstvene Usluge Zagreb",
    DESCRIPTION: "Pouzdane knjigovodstvene usluge za poduzeća svih veličina u Zagrebu. Obratite nam se za profesionalnu podršku.", 
    ADDRESS: "Ksaverska cesta 47",
    URL: "https://knjigovodstvo-matka.hr",
    TEST_URL: "http://localhost:3000",
} as const;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
