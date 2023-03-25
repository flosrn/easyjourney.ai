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
        title: "Catégories",
        href: "/posters/categories",
        description: "Explorez les posters par catégories, thèmes et styles",
      },
      {
        title: "Popularité",
        href: "/posters/popular",
        description:
          "Parcourez les posters les plus populaires et les mieux notés",
      },
      {
        title: "Nouveautés",
        href: "/posters/new",
        description:
          "Découvrez les dernières créations des membres de la communauté",
      },
    ],
    hasLeftImage: true,
  },
  {
    title: "Créer un poster",
    menu: [
      {
        title: "Générateur rapide",
        href: "/posters/create/quick",
        description: "Créez rapidement un poster avec un prompt",
      },
      {
        title: "Générateur avancé",
        href: "/posters/create/advanced",
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
      title: "Profil",
      href: "/profile",
      icon: User,
    },
    {
      title: "Mes posters",
      href: "/profile/posters",
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
      icon: LogOut,
      onClick: signOut,
    },
  ],
];

export const siteConfig: SiteConfig = {
  name: "Homaide.art",
  description:
    "Créez vos posters personnalisés en quelques clics et recevez-les chez vous !",
  megaMenu,
  userMenu,
};
