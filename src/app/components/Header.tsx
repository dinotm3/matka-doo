import { SITE_INFO } from "../constants/constants";

export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
        {/* Left: logo */}
        <a
          href="#top"
          className="justify-self-center md:justify-self-start flex items-center gap-3 px-6 py-3"
        >
          <img
            src="/logo_transparent.svg"
            alt={SITE_INFO.name}
            className="h-20 md:h-60 w-auto"
          />
        </a>

        {/* Center: nav */}
        <nav className="justify-self-center flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-lg pb-4 md:pb-0">
          <a href="#about" className="hover:text-gray-300">
            {SITE_INFO.pages.about}
          </a>
          <a href="#services" className="hover:text-gray-300">
            {SITE_INFO.pages.services}
          </a>
          <a href="#location" className="hover:text-gray-300">
            {SITE_INFO.pages.location}
          </a>
          <a
            href="#contact"
            className="rounded-md bg-white/10 px-3 py-2 hover:bg-white/20"
          >
            {SITE_INFO.pages.contact}
          </a>
        </nav>

        {/* Right spacer (only needed on desktop) */}
        <div className="hidden md:block" />
      </div>
    </header>
  );
}
