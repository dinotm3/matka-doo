import { LOKACIJA, SITE_INFO, STRINGS } from "../../constants/constants";

export default function Footer() {
  return (
    <footer id="page-footer" className="bg-brand-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <address className="not-italic text-center text-sm space-y-1">
          <div className="text-base font-semibold">{SITE_INFO.name}</div>
          <div>{LOKACIJA.adresa}</div>
          <div>
            <a href={`tel:${SITE_INFO.phone}`} className="hover:underline">
              {SITE_INFO.phoneDisplay}
            </a>
            {" · "}
            <a href={`mailto:${SITE_INFO.email}`} className="hover:underline">
              {SITE_INFO.email}
            </a>
          </div>
          <div className="text-white/80">{LOKACIJA.strings.radno_vrijeme}</div>
        </address>
        <p className="mt-4 text-center text-xs text-white/70">
          © {new Date().getFullYear()} {SITE_INFO.name} | {STRINGS.footer.all_rights_reserved}
        </p>
      </div>
    </footer>
  );
}
