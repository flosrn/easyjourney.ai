"use client";

import React from "react";
import Link from "next/link";

import DesktopNavItem from "~/components/header/menu/desktop-nav-item";
import MyFeedMenuItem from "~/components/header/my-feed-menu-item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

import { cn } from "~/lib/classNames";
import { siteConfig } from "~/config/site";

type NavbarProps = {
  className?: string;
};

export const DesktopNav = ({ className }: NavbarProps) => {
  return (
    <NavigationMenu className={cn("max-w-full", className)}>
      <NavigationMenuList>
        {siteConfig.megaMenu.map((megaMenuItem) => (
          <NavigationMenuItem key={megaMenuItem.title}>
            <NavigationMenuTrigger>{megaMenuItem.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className={cn(
                  megaMenuItem.hasLeftImage
                    ? "grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                    : "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                )}
              >
                {megaMenuItem.hasLeftImage && (
                  <li className="row-span-4">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/posters/popular"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          EXPLORER
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Discover posters from the community.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                )}

                {megaMenuItem.menu.map((menuItem) => (
                  <DesktopNavItem
                    key={menuItem.title}
                    title={menuItem.title}
                    href={menuItem.href}
                    disabled={menuItem.disabled}
                  >
                    {menuItem.description}
                  </DesktopNavItem>
                ))}
                {megaMenuItem.title === "Explore" && (
                  <MyFeedMenuItem ListItem={DesktopNavItem} />
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
