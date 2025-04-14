import Link from "next/link";
import { CONST } from "../constants/constants";

export default function Sidebar() {
    return (
      <div className="w-64 bg-gray-800 text-white p-6 fixed top-0 left-0 bottom-0">
        <h2 className="text-2xl font-semibold mb-6">{CONST.NAME}</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="#about" className="hover:text-gray-400">
              {CONST.PAGES.ABOUT}
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-gray-400">
              {CONST.PAGES.SERVICES}
              </Link>
            </li>
            <li>
              <Link href="#location" className="hover:text-gray-400">
              {CONST.PAGES.LOCATION}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  

  