import { SITE_INFO } from "./constants";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: SITE_INFO.pages.home ?? "Početna",
    href: "/",
  },
  {
    id: "usluge",
    label: SITE_INFO.pages.services,
    href: "/usluge",
  },
  {
    id: "location",
    label: SITE_INFO.pages.location,
    href: "/#location",
  },
  {
    id: "contact",
    label: SITE_INFO.pages.contact,
    href: "/#contact",
  },
];
