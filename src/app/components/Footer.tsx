import { SITE_INFO, STRINGS } from "../constants/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {SITE_INFO.name} |{" "}
          {STRINGS.all_rights_reserved}
        </p>
      </div>
    </footer>
  );
}
