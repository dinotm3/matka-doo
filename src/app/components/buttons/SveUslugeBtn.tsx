import { btnHighlight } from "@/app/constants/uiClasses";
import Link from "next/link";

export default function SveUslugeBtn() {
  return (
    <Link
      href="/usluge"
      className={[
        "inline-flex items-center justify-center rounded-full bg-brand-900/70",
        "px-6 py-4 text-lg font-semibold text-white shadow-xl",
        "hover:bg-black transition",
        btnHighlight,
      ].join(" ")}
    >
      Pogledajte sve usluge
    </Link>
  );
}
