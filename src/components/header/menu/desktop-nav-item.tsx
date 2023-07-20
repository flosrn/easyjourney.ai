"use client";

import React from "react";
import Link from "next/link";

import { NavigationMenuLink } from "~/components/ui/navigation-menu";

import { cn } from "~/lib/classNames";

type DesktopNavItemProps = {
  title: string;
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  className?: string;
};

const DesktopNavItem = ({
  title,
  href,
  disabled,
  children,
  ref,
  className,
}: DesktopNavItemProps) => {
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

export default DesktopNavItem;
