"use client";

import React from "react";

import { Input } from "~/components/ui/Input";
import { Slider } from "~/components/ui/Slider";

import { cn } from "~/lib/classNames";

import { useStopStore } from "../../store/stopStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const StopSelector = ({ className, ...props }: SliderProps) => {
  const [stopValue, setStopValue] = useStopStore((state) => [
    state.stopValue,
    state.setStopValue,
  ]);
  const handleChaosValueChange = (value: number[] | number) => {
    setStopValue(value.toString());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Number.parseInt(inputValue) < 10) {
      setStopValue("10");
    }
    if (Number.parseInt(inputValue) > 100) {
      setStopValue("100");
    }
    setStopValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleChaosValueChange}
        defaultValue={[Number.parseInt(stopValue)]}
        value={[Number.parseInt(stopValue)]}
        min={10}
        max={100}
        step={10}
        className={cn("w-[70%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={0}
        max={1000}
        placeholder={stopValue}
        value={stopValue}
        onChange={handleInputChange}
        className={cn("w-[25%]", className)}
      />
      {/* <div className="rounded-xl border p-2">{stopValue}</div> */}
    </div>
  );
};

export default StopSelector;
