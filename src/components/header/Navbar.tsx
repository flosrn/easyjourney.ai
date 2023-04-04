"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/NavigationMenu";

import { cn } from "~/lib/classNames";
import { siteConfig } from "~/config/site";

import { Icons } from "../Icons";

export const Navbar = () => {
  return (
    <NavigationMenu>
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
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className="h-6 w-6 text-white" />
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          POSTERS
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Explorez les posters par thèmes, styles et popularité
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                )}
                {megaMenuItem.menu.map((menuItem) => (
                  <ListItem
                    key={menuItem.title}
                    title={menuItem.title}
                    href={menuItem.href}
                  >
                    {menuItem.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
