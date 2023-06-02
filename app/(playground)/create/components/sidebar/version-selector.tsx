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
          <SelectItem value="default">Version 5.1</SelectItem>
          <SelectItem value="--v 5.1 --style raw">Verions 5.1 raw</SelectItem>
          <SelectItem value="--niji 5">Niji 5</SelectItem>
          <SelectItem value="--niji 5 --style cute">Niji 5 cute</SelectItem>
          <SelectItem value="--niji 5 --style scenic">Niji 5 scenic</SelectItem>
          <SelectItem value="--niji 5 --style expressive">
            Niji 5 expressive
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default VersionSelector;
