"use client";

import React from "react";

import { Input } from "~/components/ui/input";

import { useSeedStore } from "../../store/seedStore";

const SeedSelector = () => {
  const [seedValue, setSeedValue] = useSeedStore((state) => [
    state.seedValue,
    state.setSeedValue,
  ]);

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
    <div className="w-full">
      <Input
        type="number"
        placeholder="Select a number"
        value={seedValue}
        onChange={handleInputChange}
        min={1}
        max={999999999}
        className="float-right w-2/5 truncate lg:w-4/5"
      />
    </div>
  );
};

export default SeedSelector;
