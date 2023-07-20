"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import HeaderLogo from "~/components/header/header-logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { cn } from "~/lib/classNames";
import { siteConfig } from "~/config/site";

type PlaygroundNavProps = {
  className?: string;
};

const MobileNav = ({ className }: PlaygroundNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex-center shrink-0 items-center h-full space-x-1",
            className
          )}
        >
          <HeaderLogo isMobile />
          <ChevronDownIcon
            className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-200 ease-in-out",
              {
                "transform rotate-180": isOpen,
              }
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        sideOffset={3}
        align="start"
        alignOffset={-15}
        className="w-56"
      >
        <DropdownMenuLabel className="flex">
          <Link href="/">
            <HeaderLogo className="mb-1 h-6" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {siteConfig.megaMenu.map((megaMenuItem) => (
          <React.Fragment key={megaMenuItem.title}>
            {megaMenuItem.menu.map((menuItem) => (
              <DropdownMenuItem
                key={menuItem.title}
                disabled={menuItem.disabled}
              >
                <Link href={menuItem.href}>
                  <span>{menuItem.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </React.Fragment>
        ))}
        <Link
          href="/"
          className="flex-center relative cursor-pointer select-none items-center rounded-sm px-2 text-xs outline-none"
        >
          Easyjourney.ai
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
