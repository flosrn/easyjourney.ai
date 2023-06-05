"use client";

import React from "react";
import { LucideShuffle } from "lucide-react";

import { Input } from "~/components/ui/input";

import { useSeedStore } from "../../store/seedStore";

const SeedSelector = () => {
  const [seedValue, setSeedValue] = useSeedStore((state) => [
    state.seedValue,
    state.setSeedValue,
  ]);

  const handleRandomSeedNumber = () => {
    const randomSeed = Math.floor(Math.random() * 999999999) + 1;
    setSeedValue(randomSeed.toString());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Number.parseInt(inputValue) < 1) {
      setSeedValue("");
    }
    if (Number.parseInt(inputValue) > 999999999) {
      setSeedValue("999999999");
    }
    setSeedValue(inputValue);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <button
        onClick={handleRandomSeedNumber}
        className="ml-1 h-full w-1/5 pr-2"
      >
        <LucideShuffle />
      </button>
      <Input
        type="number"
        placeholder="Select a number"
        value={seedValue}
        onChange={handleInputChange}
        min={1}
        max={999999999}
        className="mr-1 w-3/5 truncate text-right"
      />
    </div>
  );
};

export default SeedSelector;
