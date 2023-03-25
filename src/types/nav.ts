import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
};

export type MenuItem = {
  title: string;
  href: string;
  description: string;
};

export type MegaMenu = {
  title: string;
  menu: MenuItem[];
  hasLeftImage?: boolean;
};
