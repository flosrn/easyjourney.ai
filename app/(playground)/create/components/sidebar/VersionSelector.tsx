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

import { useVersionStore } from "../../store/versionStore";

const VersionSelector = () => {
  const setVersionValue = useVersionStore((state) => state.setVersionValue);

  const handleStyleValueChange = (value: string) => {
    setVersionValue(value);
  };

  return (
    <Select onValueChange={handleStyleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Version</SelectLabel>
          <SelectItem value="default">Version 5 (default)</SelectItem>
          <SelectItem value="--v 5.1 --style raw">
            Verions 5 : style raw
          </SelectItem>
          <SelectItem value="--niji 5">niji 5</SelectItem>
          <SelectItem value="--niji 5 --style cute ">
            niji 5 : style cute
          </SelectItem>
          <SelectItem value="--niji 5 --style scenic">
            niji 5 : style scenic
          </SelectItem>
          <SelectItem value="--niji 5 --style expressive  ">
            niji 5 : style expressive
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default VersionSelector;
