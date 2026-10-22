"use client";

import React, { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal.
 *
 * One IntersectionObserver is shared by every instance. When an element
 * enters the viewport the observer flips a data attribute on the DOM node
 * directly, and CSS (see `[data-reveal]` in globals.css) runs the opacity and
 * transform transition on the compositor. No React state, no per-frame
 * JavaScript, nothing to re-render while the user scrolls.
 *
 * `repeat` controls what happens when an element leaves the viewport again:
 * "only-up" (default) hides it when the user scrolls back up past it, so it
 * replays on the way down; "always" hides it on any exit; "never" keeps it.
 */

export type RevealDirection = "left" | "right" | "up" | "down" | "none";
export type RevealRepeat = "never" | "always" | "only-up";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Where the element slides in from. */
  direction?: RevealDirection;
  /** Slide distance in px. */
  distance?: number;
  /** How much of the element must be visible before it reveals (0–1). */
  amount?: number;
  /** Transition delay in ms, for staggering lists. */
  delay?: number;
  /** When to hide again so the reveal can replay. */
  repeat?: RevealRepeat;
  /** Render as a different element, e.g. "li". */
  as?: "div" | "li" | "section";
};

// --- shared scroll direction -----------------------------------------------
// One passive listener for every instance; only records a direction flag.

let scrollDir: "up" | "down" = "down";
let lastY = 0;
let dirSubscribers = 0;
let dirHandler: (() => void) | null = null;

function subscribeScrollDir(): () => void {
  dirSubscribers++;
  if (dirSubscribers === 1 && typeof window !== "undefined") {
    lastY = window.scrollY;
    dirHandler = () => {
      const y = window.scrollY;
      if (y !== lastY) {
        scrollDir = y < lastY ? "up" : "down";
        lastY = y;
      }
    };
    window.addEventListener("scroll", dirHandler, { passive: true });
  }
  return () => {
    dirSubscribers--;
    if (dirSubscribers === 0 && dirHandler) {
      window.removeEventListener("scroll", dirHandler);
      dirHandler = null;
    }
  };
}

// --- shared observer -------------------------------------------------------

type Entry = { amount: number; repeat: RevealRepeat };
const targets = new WeakMap<Element, Entry>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const meta = targets.get(entry.target);
        if (!meta) continue;
        const el = entry.target as HTMLElement;

        if (entry.isIntersecting && entry.intersectionRatio >= meta.amount) {
          el.dataset.visible = "true";
          if (meta.repeat === "never") {
            observer?.unobserve(entry.target);
            targets.delete(entry.target);
          }
        } else if (!entry.isIntersecting && el.dataset.visible === "true") {
          const hide =
            meta.repeat === "always" || (meta.repeat === "only-up" && scrollDir === "up");
          if (hide) delete el.dataset.visible;
        }
      }
    },
    // A handful of thresholds so any `amount` value fires close to when it
    // is actually reached, without a callback per scrolled pixel.
    { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "0px 0px -5% 0px" }
  );
  return observer;
}

function offset(direction: RevealDirection, distance: number): { x: string; y: string } {
  const d = `${Math.abs(distance)}px`;
  switch (direction) {
    case "left":
      return { x: `-${d}`, y: "0px" };
    case "right":
      return { x: d, y: "0px" };
    case "up":
      return { x: "0px", y: d };
    case "down":
      return { x: "0px", y: `-${d}` };
    default:
      return { x: "0px", y: "0px" };
  }
}

export default function Reveal({
  children,
  className = "",
  direction = "up",
  distance = 20,
  amount = 0.25,
  delay = 0,
  repeat = "only-up",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    if (!io) {
      // Old browser: just show it.
      el.dataset.visible = "true";
      return;
    }

    const unsubscribeDir = repeat === "only-up" ? subscribeScrollDir() : null;
    targets.set(el, { amount: Math.min(Math.max(amount, 0), 1), repeat });
    io.observe(el);
    return () => {
      io.unobserve(el);
      targets.delete(el);
      unsubscribeDir?.();
    };
  }, [amount, repeat]);

  const { x, y } = offset(direction, distance);
  const style = {
    "--reveal-x": x,
    "--reveal-y": y,
    "--reveal-delay": `${delay}ms`,
  } as React.CSSProperties;

  return (
    // @ts-expect-error — ref type widens across the allowed tags
    <Tag ref={ref} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
