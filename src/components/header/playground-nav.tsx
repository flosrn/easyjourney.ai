import React, { useState } from "react";
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
        sideOffset={5}
        align="start"
        alignOffset={-20}
        className="w-56"
      >
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlaygroundNav;
