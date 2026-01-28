import { SITE_INFO, STRINGS } from "../constants/constants";

export default function Footer() {
  return (
    <footer id="page-footer" className="bg-brand-900/90 text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm">
        © {new Date().getFullYear()} {SITE_INFO.name} |{" "}
        {STRINGS.footer.all_rights_reserved}
      </div>
    </footer>
  );
}
