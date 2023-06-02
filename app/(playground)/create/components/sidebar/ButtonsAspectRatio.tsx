"use client";

import React from "react";

import { Button } from "~/components/ui/Button";

import { cn } from "~/lib/classNames";

import { aspectRatios } from "../../data/aspectRatios";
import { useRatioStore } from "../../store/ratioStore";

type ButtonsAspectRatioProps = {};

const ButtonsAspectRatio = ({}: ButtonsAspectRatioProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useRatioStore(
    (state) => [state.selectedAspectRatio, state.setSelectedAspectRatio]
  );
  return (
    <div className="space-y-2">
      {aspectRatios.map(({ ratio, name, value }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name, value })}
          variant="outline"
          size="xs"
          className={cn(
            "mx-1 w-[calc(25%-8px)] md:w-[calc(100%/6-8px)] lg:w-[calc(25%-8px)]",
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

export default ButtonsAspectRatio;
