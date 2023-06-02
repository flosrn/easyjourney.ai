"use client";

import { Switch } from "~/components/ui/Switch";

import { useTileStore } from "../../store/tileStore";

const TileSelector = () => {
  const [tileValue, toggleTileValue] = useTileStore((state) => [
    state.tileValue,
    state.toggleTileValue,
  ]);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="tile-mode"
        onCheckedChange={toggleTileValue}
        checked={tileValue}
      />
    </div>
  );
};

export default TileSelector;
