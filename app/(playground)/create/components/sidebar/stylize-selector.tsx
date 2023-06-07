"use client";

import React from "react";

import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

import { cn } from "~/lib/classNames";

import { useStylizeStore } from "../../store/stylizeStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const StylizeSelector = ({ className, ...props }: SliderProps) => {
  const [stylizeValue, disabledStylizeSelector, setStylizeValue] =
    useStylizeStore((state) => [
      state.stylizeValue,
      state.isStylizeSelectorDisabled,
      state.setStylizeValue,
    ]);

  const handleStylizeValueChange = (value: number[]) => {
    const [value1] = value;
    setStylizeValue(value1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue < 0) {
      setStylizeValue(0);
    }
    if (inputValue > 1000) {
      setStylizeValue(1000);
    }
    setStylizeValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleStylizeValueChange}
        defaultValue={[stylizeValue]}
        value={[stylizeValue]}
        disabled={disabledStylizeSelector}
        max={1000}
        step={1}
        className={cn("w-[65%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={0}
        max={1000}
        step={1}
        value={stylizeValue}
        disabled={disabledStylizeSelector}
        onChange={handleInputChange}
        className={cn("w-[30%] truncate mr-1", className)}
      />
    </div>
  );
};
export default StylizeSelector;
