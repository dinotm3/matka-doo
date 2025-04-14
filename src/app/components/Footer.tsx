import { CONST } from "../constants/constants";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Matka d.o.o. | All rights reserved</p>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-gray-400">{CONST.PAGES.ABOUT}</a></li>
              <li><a href="#services" className="hover:text-gray-400">{CONST.PAGES.SERVICES}</a></li>
              <li><a href="#location" className="hover:text-gray-400">{CONST.PAGES.LOCATION}</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }
  
