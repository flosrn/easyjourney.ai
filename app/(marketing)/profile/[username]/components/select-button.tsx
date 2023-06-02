"use client";

import React from "react";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { MousePointerClick } from "lucide-react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type SelectButtonProps = {};

const SelectButton = ({}: SelectButtonProps) => {
  const [isModalSelectOpen, toggleModalSelectOpen] = useSelectBarStore(
    (state) => [state.isSelectBarOpen, state.toggleSelectBar]
  );

  const clearSelectedPosters = useSelectPosterStore(
    (state) => state.clearSelectedPosters
  );

  const toggleModal = () =>
    isModalSelectOpen
      ? (clearSelectedPosters(), toggleModalSelectOpen())
      : toggleModalSelectOpen();

  return (
    <Button
      onClick={toggleModal}
      variant="outline"
      className={cn("shrink-0", {
        "outline outline-highlight outline-offset-2 outline-2":
          isModalSelectOpen,
      })}
    >
      <MousePointerClick className="h-4 w-4" />
      <span className="ml-2 hidden sm:block">Select Images</span>
    </Button>
  );
};

export default SelectButton;
