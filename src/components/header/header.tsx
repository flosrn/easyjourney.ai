import React from "react";
import Link from "next/link";

import HeaderLogo from "~/components/header/header-logo";
import { DesktopNav } from "~/components/header/menu/desktop-nav";
import DropdownUserMenuNav from "~/components/header/menu/dropdown-user-menu-nav";
import MobileNav from "~/components/header/menu/mobile-nav";
import UserCreditsPopover from "~/components/header/menu/user-credits-popover";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type HeaderProps = {
  variant?: "default" | "playground";
};

const Header = ({ variant = "default" }: HeaderProps) => {
  const isDefaultVariant = variant === "default";
  const isPlaygroundVariant = variant === "playground";
  return (
    <header className="supports-backdrop-blur:bg-background/10 fixed top-0 z-40 w-full border-b bg-background shadow-sm backdrop-blur">
      <div
        className={cn("flex h-16 items-center", {
          container: isDefaultVariant,
          "px-4 md:px-6": isPlaygroundVariant,
        })}
      >
        <div className="flex h-full flex-1 items-center justify-between">
          <div
            className={cn("flex h-full items-center", {
              "md:space-x-4": isDefaultVariant,
            })}
          >
            <Link
              href="/"
              className={cn({
                "hidden md:block mb-3": isDefaultVariant,
                hidden: isPlaygroundVariant,
              })}
            >
              <HeaderLogo />
            </Link>
            <MobileNav
              className={cn({
                "md:hidden": isDefaultVariant,
                "hidden border-r pr-4 h-full": isPlaygroundVariant,
              })}
            />
            <DesktopNav
              className={cn({
                "hidden md:block": isDefaultVariant,
                hidden: isPlaygroundVariant,
              })}
            />
            {isPlaygroundVariant && (
              <h2 className="pl-5 text-lg font-semibold">Playground</h2>
            )}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {isDefaultVariant && (
              <Button asChild>
                <Link href="/playground">Create</Link>
              </Button>
            )}
            <div
              className={cn("flex items-center space-x-2", {
                "md:space-x-4": isDefaultVariant,
              })}
            >
              <UserCreditsPopover />
              <DropdownUserMenuNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
