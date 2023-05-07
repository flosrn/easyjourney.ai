import {
  CalendarCheck2,
  CreditCard,
  DollarSign,
  Heart,
  History,
  LogOut,
  Palette,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

import type { MegaMenu, NavItem } from "~/types/nav";

type SiteConfig = {
  name: string;
  description: string;
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
      },
    ],
    hasLeftImage: true,
  },
  {
    title: "Créer un poster",
    menu: [
      {
        title: "Générateur rapide",
        href: "/create",
        description: "Créez rapidement un poster avec un prompt",
      },
      {
        title: "Générateur avancé",
        href: "/create",
        description: "Personnalisez votre poster avec des paramètres avancés",
      },
      {
        title: "Tutoriels et astuces",
        href: "/posters/tutorials",
        description: "Apprenez à créer des posters uniques et efficaces",
      },
      {
        title: "Galerie de créations",
        href: "/posters/gallery",
        description: "Admirez les créations des membres de la communauté",
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
      },
      {
        title: "L'équipe",
        href: "/about/team",
        description: "Rencontrez les personnes derrière ce projet innovant",
      },
      {
        title: "Technologie IA",
        href: "/about/technology",
        description:
          "Apprenez-en davantage sur l'intelligence artificielle utilisée pour générer les posters",
      },
      {
        title: "FAQ",
        href: "/about/faq",
        description:
          "Consultez les questions fréquemment posées par nos utilisateurs",
      },
      {
        title: "Contactez-nous",
        href: "/about/contact",
        description:
          "N'hésitez pas à nous contacter pour toute question ou suggestion",
      },
    ],
  },
];

const userMenu: NavItem[][] = [
  [
    {
      title: "Mon profil",
      href: "/profile/me",
      icon: User,
      onClick: () => null,
    },
    {
      title: "Mes posters",
      href: "/dashboard/my-posters",
      icon: ShoppingCart,
    },
    {
      title: "Mes favoris",
      href: "/dashboard/favorites",
      icon: Heart,
    },
  ],
  [
    {
      title: "Gains",
      href: "/dashboard/rewards",
      icon: DollarSign,
    },
    {
      title: "Abonnement",
      href: "/dashboard/subscription",
      icon: CalendarCheck2,
    },
    {
      title: "Méthodes de paiement",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Historique des transactions",
      href: "/dashboard/transactions",
      icon: History,
    },
  ],
  [
    {
      title: "Dark mode",
      href: "/theme",
      icon: Palette,
    },
    {
      title: "Réglages",
      href: "/dashboard/settings",
      icon: Settings,
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
  name: "myposter.ai",
  description:
    "Créez vos posters personnalisés en quelques clics et recevez-les chez vous !",
  megaMenu,
  userMenu,
};
