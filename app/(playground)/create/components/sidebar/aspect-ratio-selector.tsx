"use client";

import React, { useEffect } from "react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import { aspectRatios, aspectRatiosV4 } from "../../data/aspectRatios";
import { useRatioStore } from "../../store/ratioStore";
import { useVersionStore } from "../../store/versionStore";

type AspectRatioSelectorProps = {};

const AspectRatioSelector = ({}: AspectRatioSelectorProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useRatioStore(
    (state) => [state.selectedAspectRatio, state.setSelectedAspectRatio]
  );

  const versionValue = useVersionStore((state) => state.versionValue);

  useEffect(() => {
    if (versionValue === "--v 4") {
      setSelectedAspectRatio(aspectRatiosV4[0]);
    } else {
      setSelectedAspectRatio(selectedAspectRatio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versionValue]);

  const isRatioV4 = versionValue === "--v 4" ? true : false;

  return (
    <div className="space-y-2">
      {aspectRatios.map(({ ratio, name, value }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name, value })}
          disabled={isRatioV4}
          variant="outline"
          size="xs"
          className={cn(
            "mx-1 w-[calc(25%-8px)] md:w-[calc(100%/8-8px)] lg:w-[calc(25%-8px)]",
            {
              "outline outline-offset-2 outline-blue-500":
                ratio === selectedAspectRatio.ratio,
            }
          )}
        >
          {name}
        </Button>
      ))}
      {aspectRatiosV4.map(({ ratio, name, value }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name, value })}
          variant="outline"
          size="xs"
          className={cn(
            "mx-1 w-[calc(25%-8px)] md:w-[calc(100%/8-8px)] lg:w-[calc(25%-8px)]",
            {
              "outline outline-offset-2 outline-blue-500":
                ratio === selectedAspectRatio.ratio,
            }
          )}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default AspectRatioSelector;
