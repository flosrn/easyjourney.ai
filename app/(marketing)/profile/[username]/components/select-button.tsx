"use client";

import React from "react";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { MousePointerClick } from "lucide-react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type SelectButtonProps = {
  rounded?: boolean;
};

const SelectButton = ({ rounded }: SelectButtonProps) => {
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
      className={cn("shrink-0 bg-background", {
        "outline outline-highlight outline-offset-2 outline-2":
          isModalSelectOpen && !rounded,
        "rounded-full px-3": rounded,
      })}
    >
      <MousePointerClick className="h-4 w-4" />
      {!rounded && <span className="ml-2 hidden sm:block">Select Images</span>}
    </Button>
  );
};

export default SelectButton;
