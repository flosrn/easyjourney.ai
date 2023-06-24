import {
  BookMarkedIcon,
  CalendarCheck2Icon,
  HeartIcon,
  HistoryIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import type { Hero, MegaMenu, NavItem } from "~/types/nav";

type SiteConfig = Hero & {
  megaMenu: MegaMenu[];
  userMenu: NavItem[][];
};

const megaMenu: MegaMenu[] = [
  {
    title: "Explorer",
    menu: [
      {
        title: "Par nouveauté",
        href: "/posters/new",
        description:
          "Découvrez les dernières créations des membres de la communauté",
      },
      {
        title: "Par popularité",
        href: "/posters/popular",
        description:
          "Parcourez les posters les plus populaires et les mieux notés",
      },
      {
        title: "Par catégories",
        href: "/posters/categories",
        description: "Explorez les posters par catégories, thèmes et styles",
        disabled: true,
      },
    ],
    hasLeftImage: true,
  },
  {
    title: "Créer un poster",
    menu: [
      {
        title: "Générateur",
        href: "/create",
        description: "Personnalisez un poster en quelques clics",
      },
      {
        title: "Tutoriels et astuces",
        href: "/posters/tutorials",
        description: "Apprenez à créer des posters uniques et efficaces",
        disabled: true,
      },
      {
        title: "Galerie de créations",
        href: "/posters/gallery",
        description: "Admirez les créations des membres de la communauté",
        disabled: true,
      },
    ],
  },
  {
    title: "À propos",
    menu: [
      {
        title: "Pricing",
        href: "/pricing",
        description: "Découvrez nos plans et tarifs",
      },
      {
        title: "Notre histoire",
        href: "/about/history",
        description: "Découvrez l'origine et l'évolution de notre plateforme",
        disabled: true,
      },
      {
        title: "L'équipe",
        href: "/about/team",
        description: "Rencontrez les personnes derrière ce projet innovant",
        disabled: true,
      },
      {
        title: "Technologie IA",
        href: "/about/technology",
        description:
          "Apprenez-en davantage sur l'intelligence artificielle utilisée pour générer les posters",
        disabled: true,
      },
      {
        title: "FAQ",
        href: "/about/faq",
        description: "Got a question ? Here is the asnwer !",
      },
      {
        title: "Contactez-nous",
        href: "/about/contact",
        description:
          "N'hésitez pas à nous contacter pour toute question ou suggestion",
        disabled: true,
      },
    ],
  },
];

const userMenu: NavItem[][] = [
  [
    {
      title: "My profile",
      href: "/profile",
      icon: UserIcon,
      onClick: () => null,
    },
    {
      title: "My likes",
      href: "/profile/likes",
      icon: HeartIcon,
      onClick: () => null,
    },
    {
      title: "My boards",
      href: "/profile/boards",
      icon: BookMarkedIcon,
      onClick: () => null,
    },
  ],
  [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
      onClick: () => null,
      adminOnly: true,
    },
  ],
  [
    {
      title: "Subscription",
      href: "/settings/subscription",
      icon: CalendarCheck2Icon,
    },
    {
      title: "Payment history",
      href: "/dashboard/transactions",
      icon: HistoryIcon,
      disabled: true,
    },
  ],
  [
    {
      title: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Dark mode",
      href: "/theme",
      icon: PaletteIcon,
    },
  ],
  [
    {
      title: "Déconnexion",
      href: "/logout",
      icon: LogOutIcon,
      onClick: () => null,
    },
  ],
];

export const siteConfig: SiteConfig = {
  title: "easyjourney.ai",
  subtitle: "Generate beautiful posters in seconds with AI",
  megaMenu,
  userMenu,
};
