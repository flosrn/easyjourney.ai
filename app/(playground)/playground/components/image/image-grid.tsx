import React from "react";

import { cn } from "~/lib/classNames";

import { useTourStore } from "../../store/tourStore";

type ImageGridProps = {
  selectedImage: number | null;
  clickHandler: (part: number) => void;
  className?: string;
};

export const ImageGrid = ({
  selectedImage,
  clickHandler,
  className,
}: ImageGridProps) => {
  const [driverJs, isTourActive] = useTourStore((state) => [
    state.driverJs,
    state.isTourActive,
  ]);

  const handleClick = (part: number) => {
    clickHandler(part);
    isTourActive && driverJs?.moveNext();
  };

  return (
    <div
      className={cn(
        "absolute left-0 top-0 grid h-full w-full select-none grid-cols-2 grid-rows-2 overflow-hidden",
        className
      )}
    >
      {Array.from({ length: 4 }, (_, i) => i + 1).map((part) => (
        <button
          key={part}
          onClick={() => handleClick(part)}
          onTouchStart={() => handleClick(part)}
          className={cn(
            "focus:outline-none",
            selectedImage === part
              ? "border-[1.5px] border-dashed border-blue-400/60 bg-blue-400/40"
              : "hover:bg-white/10 rounded-md"
          )}
        />
      ))}
    </div>
  );
};
