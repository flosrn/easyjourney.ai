"use client";

import React from "react";
import { useSession } from "next-auth/react";

import DropdownMenuNav from "~/components/DropdownMenuNav";
import { Navbar } from "~/components/Navbar";

import { siteConfig } from "~/config/site";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <div className="hidden flex-1 md:flex md:items-center md:justify-between">
          <div className="flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                homaide.art
              </span>
            </a>
            <nav
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
              className="relative z-10 flex flex-1 items-center justify-center"
            >
              <Navbar />
              <div className="absolute left-0 top-full flex justify-center" />
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            {session?.user && (
              <DropdownMenuNav
                items={siteConfig.userMenu}
                user={session.user}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
