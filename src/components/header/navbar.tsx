import * as React from "react";
import Link from "next/link";

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

import { Icons } from "../ui/icons";

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
                      <Link
                        href="/posters/popular"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Icons.logo className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          EXPLORER
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Explorez les posters par thèmes, styles et popularité
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                )}
                {megaMenuItem.menu.map((menuItem) => (
                  <ListItem
                    key={menuItem.title}
                    title={menuItem.title}
                    href={menuItem.href}
                    disabled={menuItem.disabled}
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

const ListItem = ({
  title,
  href,
  disabled,
  children,
  ref,
  className,
}: {
  title: string;
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  className?: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          onClick={(event) => disabled && event.preventDefault()}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            disabled
              ? "opacity-50 pointer-events-none"
              : "hover:text-slate-900 dark:hover:text-slate-100 focus:text-slate-900 dark:focus:text-slate-100",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
