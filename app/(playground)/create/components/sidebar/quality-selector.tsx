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
} from "~/components/ui/select";

import { useQualityStore } from "../../store/qualityStore";

const QualitySelector = () => {
  const setQualityValue = useQualityStore((state) => state.setQualityValue);

  const handleQualityValueChange = (value: string) => {
    setQualityValue(value);
  };

  return (
    <Select onValueChange={handleQualityValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Quality 1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Quality 1</SelectItem>
          <SelectItem value=".5">Quality 0.5</SelectItem>
          <SelectItem value=".25">Quality 0.25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default QualitySelector;
