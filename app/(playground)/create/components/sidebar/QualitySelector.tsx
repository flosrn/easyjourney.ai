"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

import { useQualityStore } from "../../store/qualityStore";

const QualitySelector = () => {
  const setQualityValue = useQualityStore((state) => state.setQualityValue);

  const handleQualityValueChange = (value: string) => {
    setQualityValue(value);
  };

  return (
    <Select onValueChange={handleQualityValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a quality" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value=".5">0.5</SelectItem>
          <SelectItem value=".25">0.25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualitySelector;
