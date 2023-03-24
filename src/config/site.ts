import {
  CalendarCheck2,
  CreditCard,
  DollarSign,
  Heart,
  History,
  LogOut,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";

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
        title: "Thèmes",
        href: "/themes",
        description: "Explorez les posters par thèmes",
      },
      {
        title: "Styles",
        href: "/styles",
        description: "Découvrez les posters selon différents styles",
      },
      {
        title: "Popularité",
        href: "/popular",
        description: "Parcourez les posters les plus populaires",
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
        href: "/tutorials",
        description: "Apprenez à créer des posters uniques et efficaces",
      },
      {
        title: "Galerie de créations",
        href: "/gallery",
        description: "Admirez les créations des membres de la communauté",
      },
    ],
  },
  {
    title: "À propos",
    menu: [
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
        title: "Presse & Médias",
        href: "/about/press",
        description:
          "Consultez les articles et reportages sur notre plateforme",
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
      title: "Profil",
      href: "/profile",
      icon: User,
    },
    {
      title: "Mes posters",
      href: "/create",
      icon: ShoppingCart,
    },
    {
      title: "Mes favoris",
      href: "/profile/favorites",
      icon: Heart,
    },
  ],
  [
    {
      title: "Gains",
      href: "/profile/rewards",
      icon: DollarSign,
    },
    {
      title: "Abonnement",
      href: "/profile/subscription",
      icon: CalendarCheck2,
    },
    {
      title: "Méthodes de paiement",
      href: "/profile/payments",
      icon: CreditCard,
    },
    {
      title: "Historique des transactions",
      href: "/profile/transactions",
      icon: History,
    },
  ],
  [
    {
      title: "Réglages",
      href: "/profile/settings",
      icon: Settings,
    },
  ],
  [
    {
      title: "Déconnexion",
      href: "/logout",
      icon: LogOut,
      onClick: async () => signOut(),
    },
  ],
];

export const siteConfig: SiteConfig = {
  name: "flosrn.dev",
  description:
    "J'utilise des techniques modernes et les meilleures technologies pour développer toutes sortes de sites web et d'applications web.",
  megaMenu,
  userMenu,
};
