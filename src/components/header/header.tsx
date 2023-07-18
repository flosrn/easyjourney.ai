"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "~/store/mobileMenuStore";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";

import DropdownUserMenuNav from "~/components/header/dropdown-user-menu-nav";
import HeaderLogo from "~/components/header/header-logo";
import { Navbar } from "~/components/header/navbar";
import UserCreditsPopover from "~/components/header/user-credits-popover";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type HeaderProps = {
  expanded?: boolean;
};

const Header = ({ expanded }: HeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

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

  return (
    <header className="supports-backdrop-blur:bg-background/10 fixed top-0 z-40 w-full border-b bg-background shadow-sm backdrop-blur">
      <div
        className={cn(
          "flex h-14 items-center",
          expanded ? "px-4 xl:px-6" : "container"
        )}
      >
        <div className="flex flex-1 items-center justify-between">
          <div className="flex">
            <HeaderLogo />
            <Navbar />
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
