"use client";

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";

type NavContextType = {
  activeNav: string;
  setActiveNav: (id: string) => void;
  navigateTo: (id: string) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNavState] = useState("home");
  const lockedRef = useRef(false);

  // setActiveNav that respects the lock
  const setActiveNav = useCallback((id: string) => {
    if (!lockedRef.current) {
      setActiveNavState(id);
    }
  }, []);

  // Called when user clicks nav - locks updates temporarily
  const navigateTo = useCallback((id: string) => {
    lockedRef.current = true;
    setActiveNavState(id);
    // Unlock after scroll animation completes
    setTimeout(() => {
      lockedRef.current = false;
    }, 1500);
  }, []);

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav, navigateTo }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within NavProvider");
  }
  return context;
}
