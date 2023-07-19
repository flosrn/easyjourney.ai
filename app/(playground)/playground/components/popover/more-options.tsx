import React from "react";
import { LayersIcon, LayoutGridIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { DisplayMode, useDisplayStore } from "../../store/displayStore";

type MoreOptionsProps = {};

const MoreOptions = ({}: MoreOptionsProps) => {
  const [displayMode, setDisplayMode] = useDisplayStore((state) => [
    state.displayMode,
    state.setDisplayMode,
  ]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56">
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Mode ({displayMode})
        </span>
        <Tabs
          value={displayMode}
          onValueChange={(mode) => setDisplayMode(mode as DisplayMode)}
          className="mt-1 flex-1"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value={DisplayMode.STACK}>
              <LayersIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value={DisplayMode.GRID}>
              <LayoutGridIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;
