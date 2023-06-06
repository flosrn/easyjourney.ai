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
  const [disabledQualitySelector, qualityValue, setQualityValue] =
    useQualityStore((state) => [
      state.disabledQualitySelector,
      state.qualityValue,
      state.setQualityValue,
    ]);

  const handleQualityValueChange = (value: string) => {
    setQualityValue(value);
  };

  return (
    <Select
      onValueChange={handleQualityValueChange}
      disabled={disabledQualitySelector}
      value={qualityValue}
    >
      <SelectTrigger className="mx-1 w-[calc(100%-8px)]">
        <SelectValue placeholder="Quality 1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Quality 1 </SelectItem>
          <SelectItem value=".5">Quality 0.5</SelectItem>
          <SelectItem value=".25">Quality 0.25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualitySelector;
