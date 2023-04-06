"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";

import DropdownMenuNav from "~/components/header/DropdownMenuNav";
import { Navbar } from "~/components/header/Navbar";
import { CartDrawer } from "~/components/shopping-cart/CartDrawer";
import { Button } from "~/components/ui/Button";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex">
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Menu size={24} />
              </button>
            </div>
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">
                myposter.ai
              </span>
            </a>
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
            <DropdownMenuNav />
            <CartDrawer />
          </div>
        </div>
      </div>
      {isMenuOpen && (
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
