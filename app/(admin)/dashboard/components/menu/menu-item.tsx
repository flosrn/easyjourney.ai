"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";
import type { NavItem } from "~/types/nav";

type MenuItemProps = NavItem;

const MenuItem = ({ title, href }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant="link"
      className={cn("justify-start px-2 py-1", {
        "text-foreground font-bold": isActive,
      })}
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
};

export default MenuItem;
