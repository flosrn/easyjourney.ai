"use client";

import React, { useCallback, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { cn } from "~/lib/classNames";

import { useImageGenerationStore } from "../../store/imageGenerationStore";
import { useRatioStore } from "../../store/ratioStore";
import { ImageGrid } from "./ImageGrid";
import LoadingDots from "./LoadingDots";
import "react-medium-image-zoom/dist/styles.css";
import { ZoomInIcon } from "@radix-ui/react-icons";

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
    hasImage && (imageType === "generation" || imageType === "variation");

  return (
    <div className="flex-center min-h-[calc(100vh-400px)] rounded-md border p-4">
      <div
        className={cn(
          "flex-center h-full rounded-md border border-dashed p-4",
          {
            "aspect-[1/1] lg:w-[500px]": ratio === "1/1",
            "aspect-[4/5] lg:w-[400px]": ratio === "4/5",
            "aspect-[2/3] lg:w-[334px]": ratio === "2/3",
            "aspect-[4/7] lg:w-[270px]": ratio === "4/7",
            "aspect-[5/4] lg:w-[600px]": ratio === "5/4",
            "aspect-[3/2] lg:w-[650px]": ratio === "3/2",
            "aspect-[7/4] lg:w-[700px]": ratio === "7/4",
          }
        )}
      >
        {hasImage ? (
          <div className="flex-center group relative overflow-hidden">
            {currentImageUrl && (
              <ControlledZoom
                isZoomed={isZoomed}
                onZoomChange={handleZoomChange}
              >
                <img src={currentImageUrl} alt="" className="rounded-md" />
              </ControlledZoom>
            )}
            <div
              onClick={() => setIsZoomed(true)}
              className="absolute inset-0 left-1/2 top-1/2 z-10 hidden h-min w-min -translate-x-1/2 -translate-y-1/2 cursor-zoom-in p-3 group-hover:flex"
            >
              <ZoomInIcon className="h-10 w-10 text-white opacity-30" />
            </div>
            {hasImageGrid && !isLoading && (
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
                <p className="text-muted-foreground my-5 text-sm">
                  Your image is currently being generated by Midjourney, please
                  wait a moment.
                </p>
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
    </div>
  );
};

export default ImageContainer;
