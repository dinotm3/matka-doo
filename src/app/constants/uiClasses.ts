import type { CSSProperties } from "react";

// Shared light background for the ratings and contact sections: static
// gradients only (no blur, no blend modes), painted once. A soft brand-green
// wash from the top-left and a warmer light from the bottom-right lift the
// section off flat grey.
export const softGreenBackground: CSSProperties = {
  backgroundImage: [
    "radial-gradient(ellipse 70% 60% at 12% 18%, rgba(39,125,76,0.16), transparent 70%)",
    "radial-gradient(ellipse 60% 55% at 92% 85%, rgba(255,255,255,0.9), transparent 70%)",
    "radial-gradient(ellipse 45% 40% at 70% 10%, rgba(39,125,76,0.07), transparent 70%)",
    "linear-gradient(to bottom, #f1f3f1, #e3ebe6)",
  ].join(", "),
};

export const btnHighlight =
  "cursor-pointer transition-all duration-200 ease-out " +
  "hover:bg-black hover:scale-110 hover:-translate-y-1 hover:shadow-xl " +
  "active:scale-95 active:translate-y-0";
