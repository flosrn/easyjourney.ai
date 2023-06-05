"use client";

import { useEffect } from "react";

import { Switch } from "~/components/ui/switch";

import { useTileStore } from "../../store/tileStore";
import { useVersionStore } from "../../store/versionStore";
import TitleComponent from "./title-component";

const TileSelector = () => {
  const [tileValue, toggleTileValue, resetTileValue] = useTileStore((state) => [
    state.tileValue,
    state.toggleTileValue,
    state.resetTileValue,
  ]);

  const versionValue = useVersionStore((state) => state.versionValue);

  useEffect(() => {
    if (versionValue === "--v 4") {
      resetTileValue();
    }
  }, [resetTileValue, versionValue]);

  const isV4 = versionValue === "--v 4" ? true : false;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="tile-mode"
        onCheckedChange={toggleTileValue}
        checked={tileValue}
        disabled={isV4}
      />
    </div>
  );
};

export default TileSelector;
