"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

import { siteConfig } from "~/config/site";

type DropdownMenuNavProps = {};

const getFirstLetters = (name: string) => {
  const splitedName = name.split(" ");
  if (splitedName.length > 1) {
    return splitedName[0][0] + splitedName[1][0];
  }
  return name.charAt(0).toUpperCase();
};

const DropdownMenuNav = ({}: DropdownMenuNavProps) => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {session && (
          <Button variant="outline" className="w-10 rounded-full p-0">
            <Avatar className="cursor-pointer">
              {session.user.image && (
                <AvatarImage
                  src={session.user.image}
                  referrerPolicy="no-referrer"
                />
              )}
              {session.user.name && (
                <AvatarFallback>
                  {getFirstLetters(session.user.name)}
                </AvatarFallback>
              )}
              <span className="sr-only">Open popover</span>
            </Avatar>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {siteConfig.userMenu.map((group, index) => (
          <React.Fragment key={index}>
            <DropdownMenuGroup>
              {group.map(({ title, href, icon: Icon, onClick }) => {
                return (
                  <DropdownMenuItem key={title} onClick={onClick} asChild>
                    {href ? (
                      <Link href={href}>
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="truncate">{title}</span>
                      </Link>
                    ) : (
                      <div>
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="truncate">{title}</span>
                      </div>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            {group !== siteConfig.userMenu[siteConfig.userMenu.length - 1] && (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuNav;
