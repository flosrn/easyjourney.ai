import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import PlaygroundLogo from "~/components/header/playground-logo";
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

import fullLogoWhite from "../../../public/images/logo/easyjourney_logo.svg";

type PlaygroundNavProps = {};

const PlaygroundNav = ({}: PlaygroundNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-2 pr-8">
          <PlaygroundLogo />
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
        sideOffset={2}
        align="start"
        alignOffset={-22}
        className="w-56"
      >
        <DropdownMenuLabel className="flex">
          <Link href="/">
            <Image
              priority
              src={fullLogoWhite}
              alt="Easyjourney.ai"
              className="h-6 w-full"
            />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {siteConfig.megaMenu.map((megaMenuItem) => (
          <>
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
          </>
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

export default PlaygroundNav;
