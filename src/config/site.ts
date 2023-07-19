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
    title: "Explore",
    menu: [
      {
        title: "Most recent",
        href: "/posters/new",
        description: "Check the last posters created by our community",
      },
      {
        title: "Most popular",
        href: "/posters/popular",
        description:
          "Check the posters that have been liked the most by our community",
      },
      {
        title: "By category",
        href: "/posters/categories",
        description: "Explore posters sorted by categories ",
        disabled: true,
      },
    ],
    hasLeftImage: true,
  },
  {
    title: "Create a poster",
    menu: [
      {
        title: "Playground",
        href: "/playground",
        description: "Personalize and create your own poster in seconds",
      },
      {
        title: "Tutorials and tips",
        href: "/posters/tutorials",
        description: "Learn how to create the best posters, in the best way",
        disabled: true,
      },
    ],
  },
  {
    title: "About",
    menu: [
      {
        title: "Pricing",
        href: "/pricing",
        description: "Find out about our different plans and pricing",
      },
      {
        title: "FAQ",
        href: "/about/faq",
        description: "Got a question ? Here is the answer !",
      },
      {
        title: "Our history",
        href: "/about/history",
        description: "Discover the history of easyjourney.ai",
        disabled: true,
      },
      {
        title: "The team",
        href: "/about/team",
        description: "Find out more about the team behind easyjourney.ai",
        disabled: true,
      },
      {
        title: "IA technology",
        href: "/about/technology",
        description: "Learn more about the technology behind easyjourney.ai",
        disabled: true,
      },
      {
        title: "Contact us",
        href: "/about/contact",
        description:
          "You can contact us for any question, suggestion or partnership",
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
      title: "Logout",
      href: "/logout",
      icon: LogOutIcon,
      onClick: () => null,
    },
  ],
];

export const siteConfig: SiteConfig = {
  title: "easyjourney.ai",
  description:
    "Unlock the power of Midjourney with a beautiful and user-friendly interface. Create stunning visuals with ease, no AI or prompt engineering expertise required",
  url: "https://easyjourney.ai",
  megaMenu,
  userMenu,
};
