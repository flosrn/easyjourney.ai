import React from "react";

import { Navbar } from "~/components/Navbar";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center">
        <div className="hidden md:flex">
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
        <button
          className="-ml-4 inline-flex h-10 items-center justify-center rounded-md bg-transparent py-2 px-4 text-base font-medium transition-colors hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-slate-400 focus:ring-offset-0 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent md:hidden"
          type="button"
          id="radix-:R2b6i:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <circle cx={12} cy={12} r={10} />
          </svg>
          <span className="font-bold">Menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
