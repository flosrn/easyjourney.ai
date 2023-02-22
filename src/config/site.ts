import {
  Contact,
  Cpu,
  FileJson,
  Home,
  Layers,
  Lightbulb,
  PieChart,
  User,
  Wrench,
} from "lucide-react";

import type { NavItem } from "~/types/nav";

type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
  subNav: NavItem[][];
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
};

const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/about",
    icon: User,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Layers,
  },
];

const subNav: NavItem[][] = [
  [...mainNav],
  [
    {
      title: "Snippets",
      href: "/snippets",
      icon: FileJson,
    },
    {
      title: "Tools",
      href: "/tools",
      icon: Wrench,
    },
    {
      title: "Uses",
      href: "/uses",
      icon: Cpu,
    },
    {
      title: "Inspiration",
      href: "/inspiration",
      icon: Lightbulb,
    },
    {
      title: "Stats",
      href: "/stats",
      icon: PieChart,
    },
  ],
  [
    {
      title: "Contact",
      href: "/contact",
      icon: Contact,
    },
  ],
];

export const siteConfig: SiteConfig = {
  name: "flosrn.dev",
  description:
    "J'utilise des techniques modernes et les meilleures technologies pour développer toutes sortes de sites web et d'applications web.",
  mainNav,
  subNav,
  links: {
    twitter: "https://twitter.com/flo_srn",
    github: "https://github.com/flosrn",
    docs: "https://ui.shadcn.com",
  },
};
