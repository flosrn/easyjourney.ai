"use client";

import { useEffect } from "react";

import { Switch } from "~/components/ui/switch";

import { useTileStore } from "../../store/tileStore";
import { useVersionStore } from "../../store/versionStore";

const TileSelector = () => {
  const [
    tileValue,
    isTileSelectorDisabled,
    setTileValue,
    setIsTileSelectorDisabled,
    toggleTileValue,
  ] = useTileStore((state) => [
    state.tileValue,
    state.isTileSelectorDisabled,
    state.setTileValue,
    state.setIsTileSelectorDisabled,
    state.toggleTileValue,
  ]);

  const versionValue = useVersionStore((state) => state.versionValue);

  useEffect(() => {
    if (versionValue === "--v 4") {
      setTileValue(false);
      setIsTileSelectorDisabled(true);
    } else {
      setIsTileSelectorDisabled(false);
    }
  }, [setIsTileSelectorDisabled, setTileValue, versionValue]);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="tile-mode"
        onCheckedChange={toggleTileValue}
        checked={tileValue}
        disabled={isTileSelectorDisabled}
      />
    </div>
  );
};

export default TileSelector;
