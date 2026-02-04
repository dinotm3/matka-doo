"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavContextType = {
  activeNav: string;
  setActiveNav: (id: string) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeNav, setActiveNav] = useState("home");

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
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
