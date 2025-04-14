import { SITE_INFO, STRINGS } from "../constants/constants";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} {SITE_INFO.name} | {STRINGS.all_rights_reserved}</p>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-gray-400">{SITE_INFO.pages.about}</a></li>
              <li><a href="#services" className="hover:text-gray-400">{SITE_INFO.pages.services}</a></li>
              <li><a href="#location" className="hover:text-gray-400">{SITE_INFO.pages.location}</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }
  