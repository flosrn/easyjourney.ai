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

import { useVersionStore } from "../../store/versionStore";

const VersionSelector = () => {
  const [versionValue, isVersionSelectorDisabled, setVersionValue] =
    useVersionStore((state) => [
      state.versionValue,
      state.isVersionSelectorDisabled,
      state.setVersionValue,
    ]);

  const handleStyleValueChange = (value: string) => {
    setVersionValue(value);
  };

  return (
    <Select
      onValueChange={handleStyleValueChange}
      value={versionValue}
      disabled={isVersionSelectorDisabled}
    >
      <SelectTrigger>
        <SelectValue placeholder="Version 5.1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="--v 5.1">Version 5.1</SelectItem>
          <SelectItem value="--v 5">Version 5</SelectItem>
          <SelectItem value="--v 4">Version 4</SelectItem>
          <SelectItem value="--niji 5">Version niji 5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default VersionSelector;
