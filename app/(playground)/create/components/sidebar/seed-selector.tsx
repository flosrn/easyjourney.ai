"use client";

import React, { useEffect } from "react";

import { Input } from "~/components/ui/input";

import { useSeedStore } from "../../store/seedStore";

const SeedSelector = () => {
  const [seedValue, setSeedValue] = useSeedStore((state) => [
    state.seedValue,
    state.setSeedValue,
  ]);

  const generateRandomSeed = () => {
    const randomNumber: number = Math.floor(Math.random() * 999999999) + 1;
    setSeedValue(`${randomNumber}`);
  };

  useEffect(generateRandomSeed, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (Number.parseInt(inputValue) < 0) {
      setSeedValue("0");
    }
    if (Number.parseInt(inputValue) > 999999999) {
      setSeedValue("999999999");
    }
    setSeedValue(inputValue);
  };

  return (
    <div className="">
      <Input
        type="number"
        placeholder="Select a seed number"
        value={seedValue}
        onChange={handleInputChange}
        min={1}
        max={999999999}
        className="w-full"
      />
    </div>
  );
};

export default SeedSelector;
