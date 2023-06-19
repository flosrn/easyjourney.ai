"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import type { SidebarNavItems } from "../layout";

type MobileNavProps = { items: SidebarNavItems[] };

const MobileNav = ({ items }: MobileNavProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteChange = (value: string) => {
    router.push(value);
  };

  return (
    <Select value={pathname ?? "/settings"} onValueChange={handleRouteChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MobileNav;
