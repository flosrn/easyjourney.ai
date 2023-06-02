import React from "react";

import { cn } from "~/lib/classNames";

type ImageGridProps = {
  selectedImage: number | null;
  clickHandler: (part: number) => void;
};

export const ImageGrid = ({ selectedImage, clickHandler }: ImageGridProps) => {
  return (
    <div className="absolute left-0 top-0 grid h-full w-full select-none grid-cols-2 grid-rows-2 overflow-hidden">
      {Array.from({ length: 4 }, (_, i) => i + 1).map((part) => (
        <button
          key={part}
          onClick={() => clickHandler(part)}
          className={cn(
            "focus:outline-none",
            selectedImage === part
              ? "bg-blue-400/40"
              : "hover:bg-white/10 rounded-md"
          )}
        />
      ))}
    </div>
  );
};
