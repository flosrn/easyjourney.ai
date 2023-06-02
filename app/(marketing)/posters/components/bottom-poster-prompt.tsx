"use client";

import React from "react";
import { useSelectBarStore } from "~/store/selectBarStore";

type BottomPosterPromptProps = {
  prompt: string;
};

const BottomPosterPrompt = ({ prompt }: BottomPosterPromptProps) => {
  const isModalSelectOpen = useSelectBarStore((state) => state.isSelectBarOpen);
  return (
    <>
      {!isModalSelectOpen && (
        <>
          <div className="absolute inset-0 hidden bg-black/50 md:group-hover:block" />
          <div className="absolute bottom-0 mt-1 hidden w-full truncate p-2 md:group-hover:block">
            <p className="w-full truncate text-sm font-medium text-white">
              {prompt}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default BottomPosterPrompt;
