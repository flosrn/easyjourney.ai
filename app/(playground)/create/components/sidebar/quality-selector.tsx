"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { useQualityStore } from "../../store/qualityStore";

const QualitySelector = () => {
  const [isQualitySelectorDisabled, qualityValue, setQualityValue] =
    useQualityStore((state) => [
      state.isQualitySelectorDisabled,
      state.qualityValue,
      state.setQualityValue,
    ]);

  const handleQualityValueChange = (value: string) => {
    setQualityValue(Number(value));
  };

  return (
    <Select
      onValueChange={handleQualityValueChange}
      disabled={isQualitySelectorDisabled}
      value={qualityValue.toString()}
    >
      <SelectTrigger>
        <SelectValue placeholder="Quality 1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Quality 1 </SelectItem>
          <SelectItem value="0.5">Quality 0.5</SelectItem>
          <SelectItem value="0.25">Quality 0.25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualitySelector;
