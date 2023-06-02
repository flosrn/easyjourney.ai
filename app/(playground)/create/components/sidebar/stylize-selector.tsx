"use client";

import React from "react";

import { Input } from "~/components/ui/Input";
import { Slider } from "~/components/ui/Slider";

import { cn } from "~/lib/classNames";

import { useStylizeStore } from "../../store/stylizeStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const StylizeSelector = ({ className, ...props }: SliderProps) => {
  const [stylizeValue, setStylizeValue] = useStylizeStore((state) => [
    state.stylizeValue,
    state.setStylizeValue,
  ]);

  const handleStylizeValueChange = (value: number[] | number) => {
    setStylizeValue(value.toString());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Number.parseInt(inputValue) < 0) {
      setStylizeValue("0");
    }
    if (Number.parseInt(inputValue) > 1000) {
      setStylizeValue("1000");
    }
    setStylizeValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleStylizeValueChange}
        defaultValue={[Number.parseInt(stylizeValue)]}
        value={[Number.parseInt(stylizeValue)]}
        max={1000}
        step={1}
        className={cn("w-[70%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={0}
        max={1000}
        placeholder={stylizeValue}
        value={stylizeValue}
        onChange={handleInputChange}
        className={cn("w-[25%]", className)}
      />
      {/* <div className="rounded-xl border p-2">{stylizeValue}</div> */}
    </div>
  );
};
export default StylizeSelector;
