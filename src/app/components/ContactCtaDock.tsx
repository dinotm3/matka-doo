"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slot = { top: number; left: number; width: number; height: number };

export default function ContactCtaDock() {
  const [show, setShow] = useState(false);
  const [dock, setDock] = useState(false);
  const [slot, setSlot] = useState<Slot | null>(null);

  const raf = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      setShow(window.scrollY > 500);

      const el = document.getElementById("cta-slot");
      if (!el) {
        setSlot(null);
        setDock(false);
        return;
      }

      const r = el.getBoundingClientRect();

      // store slot position in viewport coordinates
      setSlot({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });

      // Start docking when we are near/inside the Lokacija section area
      // (tweak the threshold window to taste)
      const shouldDock = r.top < window.innerHeight * 0.7 && r.top > 0;
      setDock(shouldDock);
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const btnClass =
    "inline-flex items-center justify-center rounded-full bg-brand-300 " +
    "px-6 py-4 text-lg font-semibold text-brand-50 shadow-xl " +
    "hover:bg-brand-200 transition-colors";

  if (!show) return null;

  /**
   * Straight-line rule:
   * - If slot is known, ALWAYS use slot.top as the Y position.
   * - X moves from "right-side float" to "slot.left".
   */
  const y = slot ? slot.top : window.innerHeight / 2;

  // where the button starts (right side). use a fixed right margin
  const floatWidth = 240; // approx button width; safe fallback
  const floatLeft = Math.max(
    16,
    window.innerWidth - floatWidth - 24, // 24px right margin
  );

  // where it ends (dock slot)
  const dockLeft = slot ? slot.left : floatLeft;

  // choose the left position: float or dock
  const left = dock ? dockLeft : floatLeft;

  // When docked, match slot width. Otherwise keep natural width.
  const width = dock && slot ? slot.width : "auto";
  const height = dock && slot ? slot.height : "auto";

  return (
    <div
      className="fixed z-50 transition-[left] duration-slow ease-nobounce"
      style={{
        top: y,
        left,
        width,
        height,
        // keep it perfectly aligned with the slot (no vertical animation)
        transform: "translateY(0)",
      }}
    >
      <Link
        href="/#contact"
        className={btnClass + (dock ? " w-full h-full" : "")}
      >
        Kontakt <span className="ml-2">→</span>
      </Link>
    </div>
  );
}
