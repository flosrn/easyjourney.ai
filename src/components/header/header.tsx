"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "~/store/mobileMenuStore";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import DropdownUserMenuNav from "~/components/header/dropdown-user-menu-nav";
import { Navbar } from "~/components/header/navbar";
import UserCreditsPopover from "~/components/header/user-credits-popover";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import fullLogoBlack from "../../../public/images/logo/easyjourney_logo_black.svg";
import fullLogoWhite from "../../../public/images/logo/easyjourney_logo.svg";
import logoBlack from "../../../public/images/logo/flyingfish_black.svg";
import logoWhite from "../../../public/images/logo/flyingfish_white.svg";

type HeaderProps = {
  expanded?: boolean;
};

const Header = ({ expanded }: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const [isMobileMenuOpen, toggleMobileMenu] = useMobileMenuStore((state) => [
    state.isMobileMenuOpen,
    state.toggleMobileMenu,
  ]);

  const handleBurgerMenuClick = () => {
    toggleMobileMenu();
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("pt-12");
    } else {
      document.body.classList.remove("pt-12");
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="supports-backdrop-blur:bg-background/10 fixed top-0 z-40 w-full border-b bg-background shadow-sm backdrop-blur">
      <div
        className={cn(
          "flex h-14 items-center",
          expanded ? "px-4 xl:px-8" : "container"
        )}
      >
        <div className="flex flex-1 items-center justify-between">
          <div className="flex">
            <Link
              href="/"
              className="mr-2 flex items-center space-x-2 -md:-ml-3"
            >
              <Image
                priority
                src={isDarkTheme ? fullLogoWhite : fullLogoBlack}
                alt="Easyjourney.ai"
                className="mb-3 h-8 w-full -md:hidden"
              />
              <Image
                priority
                src={isDarkTheme ? logoWhite : logoBlack}
                alt="Easyjourney.ai"
                className="h-8 w-8 md:hidden"
              />
            </Link>
            <nav
              dir="ltr"
              aria-label="Main"
              data-orientation="horizontal"
              className="relative z-10 hidden flex-1 md:flex md:items-center md:justify-center"
            >
              <Navbar />
              <div className="absolute left-0 top-full flex justify-center" />
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {pathname !== "/create" && (
              <Button asChild>
                <Link href="/create">Create</Link>
              </Button>
            )}
            <div className="flex items-center space-x-2 md:space-x-4">
              {session?.user && <UserCreditsPopover />}
              <DropdownUserMenuNav />
              <div className="md:hidden">
                <button
                  onClick={handleBurgerMenuClick}
                  className="rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav aria-label="Mobile Main" className="w-full pb-2">
            <Navbar />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
