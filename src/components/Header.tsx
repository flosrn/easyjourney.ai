"use client";

import React from "react";
import { Menu } from "lucide-react";

import DropdownMenuNav from "~/components/DropdownMenuNav";
import { Navbar } from "~/components/Navbar";
import { CartDrawer } from "~/components/shopping-cart/CartDrawer";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex">
            <div className="md:hidden">
              <button
                onClick={handleMenuToggle}
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
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
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
