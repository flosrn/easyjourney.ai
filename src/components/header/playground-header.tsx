"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import DropdownUserMenuNav from "~/components/header/dropdown-user-menu-nav";
import PlaygroundNav from "~/components/header/playground-nav";
import UserCreditsPopover from "~/components/header/user-credits-popover";

type PlaygroundHeaderProps = {};

const PlaygroundHeader = ({}: PlaygroundHeaderProps) => {
  const { data: session } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/10 fixed top-0 z-40 w-full border-b bg-background shadow-sm backdrop-blur">
      <div className="flex h-16 flex-row items-center justify-between space-y-2 px-4 md:px-6">
        <div className="flex h-full divide-x divide-accent">
          <PlaygroundNav />
          <h2 className="flex items-center pl-4 text-lg font-semibold">
            Playground
          </h2>
        </div>
        <div className="ml-auto flex w-full justify-end space-x-2">
          {/*<PresetSelector presets={presets} />*/}
          <div className="flex items-center space-x-2">
            {session?.user && <UserCreditsPopover />}
            <DropdownUserMenuNav />
          </div>
          {/*<PresetSave />*/}
          {/*<div className="hidden space-x-2 md:flex">*/}
          {/*  <PresetShare />*/}
          {/*</div>*/}
          {/*<PresetActions />*/}
        </div>
      </div>
    </header>
  );
};

export default PlaygroundHeader;
