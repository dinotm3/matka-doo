"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export type RevealDirection = "left" | "right" | "up" | "down" | "none";
export type FadeOutMode = "always" | "never" | "only-up" | "only-down";

type Props = {
  children: React.ReactNode;
  className?: string;

  direction?: RevealDirection;
  distance?: number;

  fade?: boolean;

  /** NEW: control when fade-out happens */
  fadeOutMode?: FadeOutMode;

  amount?: number;
  margin?: string;

  enterDuration?: number;
  exitDuration?: number;
  enterDelay?: number;
  exitDelay?: number;

  enterEase?: any;
  exitEase?: any;
};

function hiddenState(
  direction: RevealDirection,
  distance: number,
  fade: boolean,
) {
  const d = Math.abs(distance);
  const opacity = fade ? 0 : 1;

  switch (direction) {
    case "left":
      return { opacity, x: -d, y: 0 };
    case "right":
      return { opacity, x: d, y: 0 };
    case "up":
      return { opacity, x: 0, y: -d };
    case "down":
      return { opacity, x: 0, y: d };
    case "none":
    default:
      return { opacity, x: 0, y: 0 };
  }
}

const visibleState = { opacity: 1, x: 0, y: 0 };

export default function ScrollReveal({
  children,
  className = "",

  direction = "up",
  distance = 80,

  fade = true,
  fadeOutMode = "always",

  amount = 0.25,
  margin = "0px 0px -10% 0px",

  enterDuration = 0.6,
  exitDuration = 0.35,
  enterDelay = 0,
  exitDelay = 0,

  enterEase = [0.16, 1, 0.3, 1],
  exitEase = [0.4, 0, 1, 1],
}: Props) {
  const controls = useAnimationControls();

  const initial = useMemo(
    () => hiddenState(direction, distance, fade),
    [direction, distance, fade],
  );
  const viewport = useMemo(() => ({ amount, margin }), [amount, margin]);

  // Track scroll direction
  const lastYRef = useRef(0);
  const scrollDirRef = useRef<"up" | "down">("down");

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      scrollDirRef.current = y < lastYRef.current ? "up" : "down";
      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldFadeOut = () => {
    if (fadeOutMode === "never") return false;
    if (fadeOutMode === "always") return true;
    if (fadeOutMode === "only-up") return scrollDirRef.current === "up";
    if (fadeOutMode === "only-down") return scrollDirRef.current === "down";
    return true;
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={controls}
      viewport={viewport}
      onViewportEnter={() => {
        controls.start(visibleState, {
          duration: enterDuration,
          ease: enterEase,
          delay: enterDelay,
        });
      }}
      onViewportLeave={() => {
        if (!shouldFadeOut()) return;

        controls.start(hiddenState(direction, distance, fade), {
          duration: exitDuration,
          ease: exitEase,
          delay: exitDelay,
        });
      }}
    >
      {children}
    </motion.div>
  );
}
