"use client";

import { btnHighlight } from "@/app/constants/uiClasses";
import { motion } from "framer-motion";

interface SveUslugeBtnProps {
  onClick?: () => void;
}

export default function SveUslugeBtn({ onClick }: SveUslugeBtnProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-full bg-brand-900/70",
        "px-6 py-4 text-lg font-semibold text-white shadow-xl",
        "hover:bg-black transition-colors",
        btnHighlight,
      ].join(" ")}
    >
      Pogledajte sve usluge
    </motion.button>
  );
}
