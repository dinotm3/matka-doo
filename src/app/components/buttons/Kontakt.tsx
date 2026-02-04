import { SITE_INFO } from "@/app/constants/constants";
import { btnHighlight } from "@/app/constants/uiClasses";

export default function Kontakt() {
  return (
    <a
      href="#contact"
      className={[
        "inline-flex items-center justify-center rounded-full bg-brand-900",
        "px-6 py-4 text-lg font-semibold text-white shadow-xl",
        btnHighlight,
      ].join(" ")}
    >
      {SITE_INFO.pages.contact}
    </a>
  );
}
