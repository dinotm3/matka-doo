import { SITE_INFO, STRINGS } from "@/app/constants/constants";
import { btnHighlight } from "@/app/constants/uiClasses";
import Link from "next/link";

export default function Kontakt() {
  return (
    <Link
      href="/contact"
      className={[
        "inline-flex items-center justify-center rounded-full bg-brand-900",
        "px-6 py-4 text-lg font-semibold text-white shadow-xl",
        "hover:bg-brand-200 transition",
        btnHighlight,
      ].join(" ")}
    >
      {SITE_INFO.pages.contact}
    </Link>
  );
}
