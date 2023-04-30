import React from "react";

import { Button } from "~/components/ui/Button";

import { cn } from "~/lib/classNames";

import { aspectRatios } from "../data/aspectRatios";
import { useRatioStore } from "../store/ratioStore";

type ButtonsAspectRatioProps = {};

const ButtonsAspectRatio = ({}: ButtonsAspectRatioProps) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useRatioStore(
    (state) => [state.selectedAspectRatio, state.setSelectedAspectRatio]
  );
  return (
    <div className="space-y-2">
      {aspectRatios.map(({ ratio, name }) => (
        <Button
          key={ratio}
          onClick={() => setSelectedAspectRatio({ ratio, name })}
          variant="outline"
          size="xs"
          className={cn("mr-2", {
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

export default ButtonsAspectRatio;
