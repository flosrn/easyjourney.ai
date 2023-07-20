"use client";

import React from "react";
import { useRouter } from "next/navigation";
import getFirstLetters from "~/utils/getFirstLetter";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Switch } from "~/components/ui/switch";

import { login } from "~/lib/login";
import { siteConfig } from "~/config/site";

type DropdownUserMenuNavProps = {
  sideOffset?: number;
  alignOffset?: number;
};

const DropdownUserMenuNav = ({
  sideOffset = 15,
  alignOffset = 0,
}: DropdownUserMenuNavProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const isAdmin = session?.user.role === "ADMIN";

  if (session === null) {
    return (
      <Button onClick={login} variant="outline">
        Login
      </Button>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!session?.user) {
    return <div className="h-[40px] w-[70.83px]" />;
  }

  const handleItemClick = async (
    event: React.MouseEvent<HTMLDivElement>,
    href?: string
  ) => {
    switch (href) {
      case "/profile": {
        const username = session.user.username;
        return router.push(`/profile/${username}`);
      }
      case "/profile/likes": {
        const username = session.user.username;
        return router.push(`/profile/${username}/likes`);
      }
      case "/profile/boards": {
        const username = session.user.username;
        return router.push(`/profile/${username}/boards`);
      }
      case "/theme": {
        event.preventDefault();
        return setTheme(isDarkTheme ? "light" : "dark");
      }
      case "/logout": {
        return signOut({ callbackUrl: "/" });
      }
      default: {
        return href && router.push(href);
      }
    }
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {session !== undefined && (
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
        <DropdownMenuContent
          side="bottom"
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          align="end"
          className="w-56"
        >
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteConfig.userMenu.map((group, index) => {
            if (group[0].adminOnly && !isAdmin) {
              return null;
            }
            return (
              <React.Fragment key={index}>
                <DropdownMenuGroup>
                  {group.map(({ title, href, icon: Icon, disabled }) => (
                    <DropdownMenuItem
                      key={title}
                      asChild
                      disabled={disabled}
                      onClick={async (event) => handleItemClick(event, href)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Icon className="mr-2 h-4 w-4" />
                          <span className="truncate">{title}</span>
                        </div>
                        {href === "/theme" && <Switch checked={isDarkTheme} />}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                {group !== siteConfig.userMenu.at(-1) && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster position="bottom-right" />
    </>
  );
};

export default DropdownUserMenuNav;
