"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setAnimate(true);
    const id = setTimeout(() => setAnimate(false), 420);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div key={pathname} className={animate ? "page-enter" : undefined}>
      {children}
    </div>
  );
}
