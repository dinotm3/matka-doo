import { SITE_INFO, STRINGS } from "../constants/constants";

export default function Footer() {
  return (
    <footer id="page-footer" className="bg-gray-800 text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} {SITE_INFO.name} |{" "}
        {STRINGS.footer.all_rights_reserved}
      </div>
    </footer>
  );
}
