"use client";

import React from "react";

import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

import { cn } from "~/lib/classNames";

import { useChaosStore } from "../../store/chaosStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const ChaosSelector = ({ className, ...props }: SliderProps) => {
  const [chaosValue, disabledChaosSelector, setChaosValue] = useChaosStore(
    (state) => [
      state.chaosValue,
      state.isChaosSelectorDisabled,
      state.setChaosValue,
    ]
  );

  const handleChaosValueChange = (value: number[]) => {
    const [value1] = value;
    setChaosValue(value1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue < 0) {
      setChaosValue(0);
    }
    if (inputValue > 100) {
      setChaosValue(100);
    }
    setChaosValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleChaosValueChange}
        defaultValue={[chaosValue]}
        value={[chaosValue]}
        disabled={disabledChaosSelector}
        min={0}
        max={100}
        step={1}
        className={cn("w-[65%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={0}
        max={100}
        step={1}
        value={chaosValue}
        disabled={disabledChaosSelector}
        onChange={handleInputChange}
        className={cn("w-[30%] mr-1", className)}
      />
    </div>
  );
};
export default ChaosSelector;
