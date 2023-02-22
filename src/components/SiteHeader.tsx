"use client";

import Link from "next/link";

import DropdownMenuNav from "~/components/DropdownMenuNav";
import MainNav from "~/components/MainNav";
import { buttonVariants } from "~/components/ui/Button";

import { siteConfig } from "~/config/site";

import { Icons } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const SiteHeader = () => {
  return (
    <header className="flex-center fixed top-5 z-50 h-16 w-full">
      <nav className="bg-header container relative max-w-5xl rounded-xl backdrop-blur-[5.5px]">
        <div className="container flex h-16 items-center justify-center">
          <MainNav items={siteConfig.mainNav} />
          <div className="absolute right-8 flex items-center justify-end">
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "text-slate-700 dark:text-slate-400",
                  })}
                >
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ThemeToggle />
              <DropdownMenuNav items={siteConfig.subNav} />
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
