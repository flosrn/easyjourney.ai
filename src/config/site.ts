import {
  CalendarCheck2,
  CreditCard,
  DollarSign,
  Heart,
  History,
  LayoutDashboard,
  LogOut,
  Palette,
  Settings,
  ShoppingCart,
  User,
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
        description:
          "Consultez les questions fréquemment posées par nos utilisateurs",
        disabled: true,
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
      title: "Mon profil",
      href: "/profile",
      icon: User,
      onClick: () => null,
    },
    {
      title: "Mes favoris",
      href: "/profile/likes",
      icon: Heart,
      onClick: () => null,
    },
    {
      title: "Paramètres",
      href: "/settings",
      icon: Settings,
    },
  ],
  [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      onClick: () => null,
      adminOnly: true,
    },
  ],
  [
    {
      title: "Gains",
      href: "/dashboard/rewards",
      icon: DollarSign,
      disabled: true,
    },
    {
      title: "Abonnement",
      href: "/dashboard/subscription",
      icon: CalendarCheck2,
      disabled: true,
    },
    {
      title: "Méthodes de paiement",
      href: "/dashboard/payments",
      icon: CreditCard,
      disabled: true,
    },
    {
      title: "Historique des transactions",
      href: "/dashboard/transactions",
      icon: History,
      disabled: true,
    },
  ],
  [
    {
      title: "Dark mode",
      href: "/theme",
      icon: Palette,
    },
  ],
  [
    {
      title: "Déconnexion",
      href: "/logout",
      icon: LogOut,
      onClick: () => null,
    },
  ],
];

export const siteConfig: SiteConfig = {
  title: "myposter.ai",
  subtitle: "Generate beautiful posters in seconds with AI",
  description:
    "Unlock the power of Midjourney with a beautiful and user-friendly interface. Create stunning visuals with ease, no AI or prompt engineering expertise required",
  megaMenu,
  userMenu,
};
