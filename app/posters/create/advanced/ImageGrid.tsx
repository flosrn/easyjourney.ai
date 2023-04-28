import React from "react";

type ImageGridProps = {
  imgUrl: string;
  clickHandler: (part: number) => void;
  showGrid?: boolean;
};

export const ImageGrid = ({
  imgUrl,
  clickHandler,
  showGrid,
}: ImageGridProps) => {
  const handleClick = (part: number) => {
    clickHandler(part);
  };

  return (
    <div className="relative">
      <img src={imgUrl} alt="Divided image" className="w-full" />
      {showGrid && (
        <div className="absolute left-0 top-0 grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
          <button
            onClick={() => handleClick(1)}
            className="hover:bg-white/10 focus:outline-none"
          />
          <button
            onClick={() => handleClick(2)}
            className="hover:bg-white/10 focus:outline-none"
          />
          <button
            onClick={() => handleClick(3)}
            className="hover:bg-white/10 focus:outline-none"
          />
          <button
            onClick={() => handleClick(4)}
            className="hover:bg-white/10 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
};
