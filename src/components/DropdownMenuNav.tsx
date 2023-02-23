"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

import type { NavItem } from "~/types/nav";

type DropdownMenuNavProps = {
  items: NavItem[][];
};

const DropdownMenuNav = ({ items }: DropdownMenuNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open popover</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-56">
        <DropdownMenuLabel>@flosrn</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((group, index) => (
          <React.Fragment key={index}>
            <DropdownMenuGroup>
              {group.map(({ title, href, icon: Icon }) => (
                <DropdownMenuItem key={title} asChild>
                  <Link href={href}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{title}</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {group !== items[items.length - 1] && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuNav;
