import React from "react";
import { ImageIcon } from "lucide-react";

import { useImageGenerationStore } from "../store/imageGenerationStore";
import { ImageGrid } from "./ImageGrid";
import LoadingDots from "./LoadingDots";

type ImageContainerProps = {};

const ImageContainer = ({}: ImageContainerProps) => {
  const [images, message, selectedImage, setSelectedImage, imageType] =
    useImageGenerationStore((state) => [
      state.images,
      state.message,
      state.selectedImage,
      state.setSelectedImage,
      state.imageType,
    ]);
  const hasImage = images.length > 0;
  const lastImage = images[images.length - 1];
  const upscaledImage = imageType === "upscale";
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed p-4">
      {upscaledImage || hasImage ? (
        <div className="relative h-full overflow-hidden">
          <img
            src={lastImage.url}
            alt=""
            className="h-full min-w-[420px] rounded-md"
          />
          {hasImage && !upscaledImage && (
            <ImageGrid
              selectedImage={selectedImage}
              clickHandler={setSelectedImage}
            />
          )}
        </div>
      ) : (
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          {message ? (
            <div className="flex-center flex-col">
              <LoadingDots />
              <p className="text-muted-foreground my-5 text-sm">{message}</p>
            </div>
          ) : (
            <>
              <ImageIcon className="text-muted-foreground h-10 w-10" />
              <h3 className="mt-4 text-lg font-semibold">
                No poster generated
              </h3>
              <p className="text-muted-foreground mb-4 mt-2 text-sm">
                You have not generate any poster.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
