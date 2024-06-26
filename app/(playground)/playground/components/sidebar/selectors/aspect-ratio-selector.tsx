"use client";

import React, { useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

import { cn } from "~/lib/classNames";

import { aspectRatios, type AspectRatio } from "../../../data/aspectRatios";
import { useRatioStore } from "../../../store/ratioStore";
import { useVersionStore } from "../../../store/versionStore";

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
      setSelectedAspectRatio(aspectRatios[0]);
    } else {
      setSelectedAspectRatio(selectedAspectRatio);
    }
  }, [versionValue, selectedAspectRatio, setSelectedAspectRatio]);

  const isRatioV4 = versionValue === "--v 4";

  return (
    <div id="aspect-ratio-selector" className="flex flex-col space-y-2">
      <div className="text-xs font-medium text-muted-foreground">Landscape</div>
      <div className="grid grid-cols-6 gap-2 md:grid-cols-4">
        {[...aspectRatios].splice(0, 7).map(({ ratio, name, value }) => (
          <Button
            key={ratio}
            onClick={() => setSelectedAspectRatio({ ratio, name, value })}
            disabled={isRatioV4 || isAspectRatioSelectorDisabled}
            variant="outline"
            size="xs"
            className={cn({
              "outline outline-offset-2 outline-primary":
                ratio === selectedAspectRatio.ratio,
            })}
          >
            {name}
          </Button>
        ))}
      </div>
      <div className="text-xs font-medium text-muted-foreground">Portrait</div>
      <div className="grid grid-cols-6 gap-2 md:grid-cols-4">
        {[...aspectRatios]
          .splice(7, aspectRatios.length - 7)
          .map(({ ratio, name, value }) => (
            <Button
              key={ratio}
              onClick={() => setSelectedAspectRatio({ ratio, name, value })}
              disabled={isRatioV4 || isAspectRatioSelectorDisabled}
              variant="outline"
              size="xs"
              className={cn({
                "outline outline-offset-2 outline-primary":
                  ratio === selectedAspectRatio.ratio,
              })}
            >
              {name}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
