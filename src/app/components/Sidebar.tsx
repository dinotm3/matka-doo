import Link from "next/link";
import { SITE_INFO } from "../constants/constants";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 fixed top-0 left-0 bottom-0">
      <h2 className="text-2xl font-semibold mb-6">{SITE_INFO.name}</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="#about" className="hover:text-gray-400">
              {SITE_INFO.pages.about}
            </Link>
          </li>
          <li>
            <Link href="#services" className="hover:text-gray-400">
              {SITE_INFO.pages.services}
            </Link>
          </li>
          <li>
            <Link href="#location" className="hover:text-gray-400">
              {SITE_INFO.pages.location}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
