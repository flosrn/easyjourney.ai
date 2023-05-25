"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Dialog, DialogTrigger } from "~/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Switch } from "~/components/ui/Switch";

import { siteConfig } from "~/config/site";

import SettingsDialog from "./settings-dialog/SettingsDialog";

type DropdownUserMenuNavProps = {};

const DropdownUserMenuNav = ({}: DropdownUserMenuNavProps) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(true);
  const { data: session } = useSession();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  console.log("isSettingsDialopOpen", isSettingsDialogOpen);

  useEffect(() => {
    setTheme(isDarkTheme ? "dark" : "light");
  }, [isDarkTheme, setTheme]);

  if (session === null) {
    return (
      <Button variant="outline" href="/api/auth/signin">
        Se connecter
      </Button>
    );
  }

  const handleItemClick = async (
    event: React.MouseEvent<HTMLDivElement>,
    href?: string
  ) => {
    switch (href) {
      case "/profile/me": {
        const username = session.user.username;
        return router.push(`/profile/${username}`);
      }
      case "/theme": {
        event.preventDefault();
        return setIsDarkTheme(!isDarkTheme);
      }
      case "/logout": {
        return signOut({ callbackUrl: "/" });
      }
      case "/settings": {
        event.preventDefault();
        return setIsSettingsDialogOpen(!isSettingsDialogOpen);
      }
      default: {
        return href && router.push(href);
      }
    }
  };

  return (
    <>
      <DropdownMenu>
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
        <DropdownMenuContent side="bottom" align="end" className="w-56">
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteConfig.userMenu.map((group, index) => (
            <React.Fragment key={index}>
              <DropdownMenuGroup>
                {group.map(({ title, href, icon: Icon, disabled }) => (
                  <DropdownMenuItem
                    key={title}
                    onClick={async (event) => handleItemClick(event, href)}
                    disabled={disabled}
                    asChild
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="truncate">
                          {href === "/settings" ? (
                            <SettingsDialog title={title} />
                          ) : (
                            title
                          )}
                        </span>
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
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownUserMenuNav;
