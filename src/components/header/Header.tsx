"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import DropdownUserMenuNav from "~/components/header/DropdownUserMenuNav";
import { Navbar } from "~/components/header/Navbar";
import { CartDrawer } from "~/components/shopping-cart/CartDrawer";
import { Button } from "~/components/ui/Button";

import { cn } from "~/lib/classNames";

type HeaderProps = {
  expanded?: boolean;
};

const Header = ({ expanded }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";
  return (
    <header className="bg-background/95 sticky top-0 z-40 w-full border-b shadow-sm">
      <div
        className={cn(
          "flex h-14 items-center",
          expanded ? "px-4 xl:px-8" : "container"
        )}
      >
        <div className="flex flex-1 items-center justify-between">
          <div className="flex">
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Menu size={24} />
              </button>
            </div>
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold md:inline-block">
                myposter.ai
              </span>
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
          <div className="flex items-center space-x-2">
            {!isCreatePage && (
              <Button href="/create" className="mr-2">
                Create
              </Button>
            )}
            <DropdownUserMenuNav />
            <CartDrawer />
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav aria-label="Mobile Main" className="w-full">
            <Navbar />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
