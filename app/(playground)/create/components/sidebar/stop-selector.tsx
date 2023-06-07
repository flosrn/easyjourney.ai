"use client";

import React from "react";

import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";

import { cn } from "~/lib/classNames";

import { useStopStore } from "../../store/stopStore";

type SliderProps = React.ComponentProps<typeof Slider>;

const StopSelector = ({ className, ...props }: SliderProps) => {
  const [stopValue, disabledStopSelector, setStopValue] = useStopStore(
    (state) => [state.stopValue, state.disabledStopSelector, state.setStopValue]
  );

  const handleChaosValueChange = (value: number[]) => {
    const [value1] = value;
    setStopValue(value1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue < 10) {
      setStopValue(10);
    }
    if (inputValue > 100) {
      setStopValue(100);
    }
    setStopValue(inputValue);
  };

  return (
    <div className="flex justify-between">
      <Slider
        onValueChange={handleChaosValueChange}
        defaultValue={[stopValue]}
        value={[stopValue]}
        disabled={disabledStopSelector}
        min={10}
        max={100}
        step={10}
        className={cn("w-[65%]", className)}
        {...props}
      />
      <Input
        type="number"
        min={10}
        max={100}
        step={10}
        value={stopValue}
        disabled={disabledStopSelector}
        onChange={handleInputChange}
        className={cn("w-[30%] mr-1", className)}
      />
    </div>
  );
};

export default StopSelector;
