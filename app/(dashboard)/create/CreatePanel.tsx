"use client";

import React, { useEffect, useMemo } from "react";
import {
  ArrowBigUpIcon,
  BrushIcon,
  IterationCcwIcon,
  Loader2Icon,
  RedoIcon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";

import ImageContainer from "./components/ImageContainer";
import TextareaPrompt from "./components/TextareaPrompt";
import Sidebar from "./components/sidebar/Sidebar";
import { aspectRatios } from "./data/aspectRatios";
import { styleFilters } from "./data/styleFilters";
import { handleMessageData } from "./lib/imageGenerationUtils";
import { useFilterStore } from "./store/filterStore";
import { useImageGenerationStore } from "./store/imageGenerationStore";
import { usePromptStore } from "./store/promptStore";
import { useRatioStore } from "./store/ratioStore";

const CreatePanel = () => {
  const [
    images,
    imageIndex,
    prevImage,
    nextImage,
    generateImage,
    upscaleImage,
    variationImage,
    imageSelected,
    setSelectedImage,
    setClear,
    isLoading,
    loadingType,
    setIsLoading,
    setLoadingType,
    setImageType,
    message,
    setMessage,
  ] = useImageGenerationStore((state) => [
    state.images,
    state.imageIndex,
    state.prevImage,
    state.nextImage,
    state.generateImage,
    state.upscaleImage,
    state.variationImage,
    state.selectedImage,
    state.setSelectedImage,
    state.setClear,
    state.isLoading,
    state.loadingType,
    state.setIsLoading,
    state.setLoadingType,
    state.setImageType,
    state.message,
    state.setMessage,
  ]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useRatioStore(
    (state) => [state.selectedAspectRatio, state.setSelectedAspectRatio]
  );
  const [selectedFilter, setSelectedFilter] = useFilterStore((state) => [
    state.selectedFilter,
    state.setSelectedFilter,
  ]);
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);

  const hasImages = images.length > 0;
  const currentImage = images[imageIndex];
  const isFirst = imageIndex === 0;
  const isLast = imageIndex === images.length - 1;
  const isGenerationLoading = isLoading && loadingType === "generation";
  const isUpscaleLoading = isLoading && loadingType === "upscale";
  const isVariationLoading = isLoading && loadingType === "variation";
  const { style } = selectedFilter;
  const { ratio } = selectedAspectRatio;
  const prompt = `${promptValue}${style ? `, ${style}` : ""} ${ratio}`;
  const isEmpty = !prompt || prompt.length <= 1;

  const handleClear = () => {
    setClear();
    setPromptValue("");
    setSelectedAspectRatio(aspectRatios[0]);
    setSelectedFilter(styleFilters[0]);
  };

  const handlePreviousImage = () => {
    prevImage();
    setSelectedImage(0);
  };

  const handleNextImage = () => {
    nextImage();
    setSelectedImage(0);
  };

  const actions = useMemo(
    () => ({
      setImageType,
      setMessage,
      setIsLoading,
      setLoadingType,
    }),
    [setImageType, setMessage, setIsLoading, setLoadingType]
  );

  useEffect(() => {
    handleMessageData({ image: currentImage, ...actions });
  }, [currentImage, actions]);

  return (
    <>
      <div className="h-[calc(100vh-57px)]">
        <div className="bg-background h-full">
          <div className="grid h-full lg:grid-cols-5">
            <Sidebar className="bg-background z-10 hidden p-4 lg:block xl:px-8" />
            <div className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
              <div className="h-full grow px-4 py-6 xl:px-8">
                <div className="h-full flex-col border-none p-0 data-[state=active]:flex">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Poster generation
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Create your own poster
                      </p>
                    </div>
                    <div className="ml-auto space-x-2">
                      <>
                        <Button
                          onClick={handlePreviousImage}
                          disabled={isLoading || isFirst}
                          variant="outline"
                        >
                          <UndoIcon className="mr-2 h-4 w-4" />
                          Undo
                        </Button>
                        <Button
                          onClick={handleNextImage}
                          disabled={isLoading || isLast || !hasImages}
                          variant="outline"
                        >
                          <RedoIcon className="mr-2 h-4 w-4" />
                          Redo
                        </Button>
                        <Button
                          onClick={handleClear}
                          variant="secondary"
                          disabled={isEmpty}
                        >
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Clear
                        </Button>
                      </>
                      <Button
                        onClick={async () => generateImage(prompt)}
                        disabled={isLoading}
                      >
                        {isGenerationLoading ? (
                          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <BrushIcon className="mr-2 h-4 w-4" />
                        )}
                        Generate
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <TextareaPrompt />
                  <Sidebar className="lg:hidden" />
                  <ImageContainer />
                  {hasImages && (
                    <div className="flex justify-center space-x-2">
                      <div className="flex-center mt-4">
                        <Button
                          onClick={async () =>
                            variationImage(imageSelected, currentImage)
                          }
                          disabled={isLoading || imageSelected === 0}
                          variant="outline"
                        >
                          {isVariationLoading ? (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <IterationCcwIcon className="mr-2 h-4 w-4" />
                          )}
                          Variation
                        </Button>
                      </div>
                      <div className="flex-center mt-4">
                        <Button
                          onClick={async () =>
                            upscaleImage(imageSelected, currentImage)
                          }
                          disabled={isLoading || imageSelected === 0}
                          variant="secondary"
                        >
                          {isUpscaleLoading ? (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowBigUpIcon className="mr-2 h-4 w-4" />
                          )}
                          Upscale
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-background flex-center sticky bottom-0 h-6 border-t">
                <p className="px-4 text-xs">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default CreatePanel;
