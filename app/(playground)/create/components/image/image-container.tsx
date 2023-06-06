"use client";

import React, { useCallback, useState } from "react";
import { ZoomInIcon } from "@radix-ui/react-icons";
import { ImageIcon } from "lucide-react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { cn } from "~/lib/classNames";

import { useImageGenerationStore } from "../../store/imageGenerationStore";
import { useRatioStore } from "../../store/ratioStore";
import { ImageGrid } from "./image-grid";
import LoadingDots from "./loading-dots";

import "react-medium-image-zoom/dist/styles.css";

type ImageContainerProps = {};

const ImageContainer = ({}: ImageContainerProps) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  const [
    images,
    imageIndex,
    selectedImage,
    setSelectedImage,
    imageType,
    isLoading,
  ] = useImageGenerationStore((state) => [
    state.images,
    state.imageIndex,
    state.selectedImage,
    state.setSelectedImage,
    state.imageType,
    state.isLoading,
  ]);
  const selectedAspectRatio = useRatioStore(
    (state) => state.selectedAspectRatio
  );
  const { value: ratio } = selectedAspectRatio;
  const hasImage = images.length > 0;
  const currentImageUrl = images[imageIndex]?.url;
  const hasImageGrid =
    hasImage &&
    !isLoading &&
    (imageType === "generation" || imageType === "variation");

  return (
    <div className="flex-center min-h-[70vh] rounded-md border p-4 lg:min-h-[calc(100vh-410px)]">
      <div
        className={cn(
          "flex-center max-h-full max-w-full w-full lg:w-auto lg:h-[350px] rounded-md border border-dashed p-4",
          {
            "aspect-[1/1]": ratio === "1/1",
            "aspect-[4/7] w-auto h-full": ratio === "4/7",
            "aspect-[2/3] w-auto h-full": ratio === "2/3",
            "aspect-[4/5] w-auto h-full": ratio === "4/5",
            "aspect-[5/4]": ratio === "5/4",
            "aspect-[4/3]": ratio === "4/3",
            "aspect-[3/2]": ratio === "3/2",
            "aspect-[16/10]": ratio === "16/10",
            "aspect-[7/4]": ratio === "7/4",
            "aspect-[16/9]": ratio === "16/9",
            "aspect-[17/9]": ratio === "17/9",
            "aspect-[21/9]": ratio === "21/9",
            "aspect-[32/9]": ratio === "32/9",
            "aspect-[4/1]": ratio === "4/1",
            "aspect-[1/2] w-auto h-full": ratio === "1/2",
            "aspect-[2/1]": ratio === "2/1",
          }
        )}
      >
        {hasImage ? (
          <div
            className={cn("flex-center group relative", {
              "overflow-hidden": hasImageGrid,
            })}
          >
            {currentImageUrl && (
              <ControlledZoom
                isZoomed={isZoomed}
                onZoomChange={handleZoomChange}
              >
                <img src={currentImageUrl} alt="" className="rounded-md" />
              </ControlledZoom>
            )}
            {!isLoading && (
              <div
                onClick={() => setIsZoomed(true)}
                className="absolute inset-0 left-1/2 top-1/2 z-10 hidden h-min w-min -translate-x-1/2 -translate-y-1/2 cursor-zoom-in p-3 group-hover:flex"
              >
                <ZoomInIcon className="h-10 w-10 text-white opacity-30" />
              </div>
            )}
            {hasImageGrid && (
              <ImageGrid
                selectedImage={selectedImage}
                clickHandler={setSelectedImage}
              />
            )}
          </div>
        ) : (
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            {isLoading ? (
              <div className="flex-center flex-col">
                <LoadingDots />
                <p className="my-5 text-sm text-muted-foreground">
                  Your image is currently being generated by Midjourney, please
                  wait a moment.
                </p>
              </div>
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No poster generated
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You have not generate any poster.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
