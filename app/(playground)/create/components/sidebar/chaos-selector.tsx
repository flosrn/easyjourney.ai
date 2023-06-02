"use client";

import React from "react";

import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

import { cn } from "~/lib/classNames";

import { useChaosStore } from "../../store/chaosStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const ChaosSelector = ({ className, ...props }: SliderProps) => {
  const [chaosValue, setChaosValue] = useChaosStore((state) => [
    state.chaosValue,
    state.setChaosValue,
  ]);

  const handleChaosValueChange = (value: number[] | number) => {
    setChaosValue(value.toString());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Number.parseInt(inputValue) < 0) {
      setChaosValue("0");
    }
    if (Number.parseInt(inputValue) > 100) {
      setChaosValue("100");
    }
    setChaosValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleChaosValueChange}
        defaultValue={[Number.parseInt(chaosValue)]}
        value={[Number.parseInt(chaosValue)]}
        max={100}
        step={1}
        className={cn("w-[65%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={0}
        max={1000}
        placeholder={chaosValue}
        value={chaosValue}
        onChange={handleInputChange}
        className={cn("w-[30%]", className)}
      />
      {/* <div className="rounded-xl border p-2">{chaosValue}</div> */}
    </div>
  );
};
export default ChaosSelector;
