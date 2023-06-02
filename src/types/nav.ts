import type { LucideIcon } from "lucide-react";

export type Hero = {
  title: string;
  subtitle: string;
  description: string;
};

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
  adminOnly?: boolean;
};

export type MenuItem = {
  title: string;
  href: string;
  description: string;
  disabled?: boolean;
};

export type MegaMenu = {
  title: string;
  menu: MenuItem[];
  hasLeftImage?: boolean;
};
