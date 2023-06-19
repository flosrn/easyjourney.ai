import React from "react";

import { Separator } from "~/components/ui/separator";

import MobileNav from "./components/mobile-nav";
import SidebarNav from "./components/sidebar-nav";

export type SidebarNavItems = {
  title: string;
  href: string;
};

const sidebarNavItems: SidebarNavItems[] = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Subscription",
    href: "/settings/subscription",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
];

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-4 pb-16 xl:px-8">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="hidden md:block lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="md:hidden">
          <MobileNav items={sidebarNavItems} />
        </div>
        <div className="flex-1  lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
