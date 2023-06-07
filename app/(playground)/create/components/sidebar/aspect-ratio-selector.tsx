"use client";

import React, { useEffect } from "react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import {
  aspectRatios,
  aspectRatiosV4,
  type AspectRatio,
} from "../../data/aspectRatios";
import { useRatioStore } from "../../store/ratioStore";
import { useVersionStore } from "../../store/versionStore";

type AspectRatioSelectorProps = {};

const AspectRatioSelector = ({}: AspectRatioSelectorProps) => {
  const [
    selectedAspectRatio,
    selectedRatio,
    isAspectRatioSelectorDisabled,
    setSelectedAspectRatio,
  ] = useRatioStore((state) => [
    state.selectedAspectRatio,
    state.selectedRatio,
    state.isAspectRatioSelectorDisabled,
    state.setSelectedAspectRatio,
  ]);

  const versionValue = useVersionStore((state) => state.versionValue);

  useEffect(() => {
    if (selectedRatio) {
      let specialAspectRatio: AspectRatio = {
        name: "",
        ratio: "",
        value: "",
      };

      const valueRatio = selectedRatio.replace(":", "/");

      specialAspectRatio = {
        name: selectedRatio,
        ratio: `--ar ${selectedRatio}`,
        value: valueRatio,
      };

      setSelectedAspectRatio(specialAspectRatio);
    }
  }, [selectedRatio, setSelectedAspectRatio]);

  useEffect(() => {
    if (versionValue === "--v 4") {
      setSelectedAspectRatio(aspectRatiosV4[0]);
    } else {
      setSelectedAspectRatio(selectedAspectRatio);
    }
  }, [versionValue, selectedAspectRatio, setSelectedAspectRatio]);

  const isRatioV4 = versionValue === "--v 4";

  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4">
      {aspectRatios.map(({ ratio, name, value }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name, value })}
          disabled={isRatioV4 || isAspectRatioSelectorDisabled}
          variant="outline"
          size="xs"
          className={cn({
            "outline outline-offset-2 outline-blue-500":
              ratio === selectedAspectRatio.ratio,
          })}
        >
          {name}
        </Button>
      ))}
      {aspectRatiosV4.map(({ ratio, name, value }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name, value })}
          disabled={isAspectRatioSelectorDisabled}
          variant="outline"
          size="xs"
          className={cn({
            "outline outline-offset-2 outline-blue-500":
              ratio === selectedAspectRatio.ratio,
          })}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
