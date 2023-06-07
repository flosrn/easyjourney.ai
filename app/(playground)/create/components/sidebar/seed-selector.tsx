"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideShuffle } from "lucide-react";

import { Input } from "~/components/ui/input";

import { cn } from "~/lib/classNames";

import { useSeedStore } from "../../store/seedStore";

const SeedSelector = () => {
  const [seedValue, disabledSeedSelector, setSeedValue] = useSeedStore(
    (state) => [
      state.seedValue,
      state.isSeedSelectorDisabled,
      state.setSeedValue,
    ]
  );

  const handleRandomSeedNumber = () => {
    const randomSeed = Math.floor(Math.random() * 999999999) + 1;
    setSeedValue(randomSeed);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    if (inputValue < 0) {
      setSeedValue(0);
    }
    if (inputValue > 999999999) {
      setSeedValue(999999999);
    }
    setSeedValue(inputValue);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRandomSeedNumber}
        disabled={disabledSeedSelector}
        className={cn({
          "opacity-50 pointer-events-none": disabledSeedSelector,
        })}
      >
        <LucideShuffle className="h-5 w-5" />
      </motion.button>
      <Input
        type="number"
        placeholder="Select a number"
        value={seedValue ?? 0}
        disabled={disabledSeedSelector}
        onChange={handleInputChange}
        min={0}
        max={999999999}
        className="mr-1 w-3/5 truncate text-right"
      />
    </div>
  );
};

export default SeedSelector;
