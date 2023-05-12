"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowBigUpIcon,
  BrushIcon,
  IterationCcwIcon,
  Loader2Icon,
  RedoIcon,
  SaveIcon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";

import SideColumn from "./SideColumn";
import ImageContainer from "./components/image/ImageContainer";
import TextareaPrompt from "./components/input/TextareaPrompt";
import { aspectRatios } from "./data/aspectRatios";
import { styleFilters } from "./data/styleFilters";
import { handleMessageData } from "./lib/imageGenerationUtils";
import { useFilterStore } from "./store/filterStore";
import { useImageGenerationStore } from "./store/imageGenerationStore";
import { usePromptStore } from "./store/promptStore";
import { useRatioStore } from "./store/ratioStore";

const MainColumn = () => {
  const [
    images,
    imageIndex,
    prevImage,
    nextImage,
    generateImage,
    upscaleImage,
    variationImage,
    uploadImage,
    imageSelected,
    setSelectedImage,
    setClear,
    isLoading,
    loadingType,
    setIsLoading,
    setLoadingType,
    imageType,
    setImageType,
    message,
    setMessage,
    isImageUploaded,
  ] = useImageGenerationStore((state) => [
    state.images,
    state.imageIndex,
    state.prevImage,
    state.nextImage,
    state.generateImage,
    state.upscaleImage,
    state.variationImage,
    state.uploadImage,
    state.selectedImage,
    state.setSelectedImage,
    state.setClear,
    state.isLoading,
    state.loadingType,
    state.setIsLoading,
    state.setLoadingType,
    state.imageType,
    state.setImageType,
    state.message,
    state.setMessage,
    state.isImageUploaded,
  ]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useRatioStore(
    (state) => [state.selectedAspectRatio, state.setSelectedAspectRatio]
  );
  const [selectedFilters, setSelectedFilters] = useFilterStore((state) => [
    state.selectedFilters,
    state.setSelectedFilters,
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
  const isUploadLoading = isLoading && loadingType === "upload";
  const isImageUpscaled = imageType === "upscale";
  const { ratio, value: ratioValue } = selectedAspectRatio;
  const styles: string[] = selectedFilters.map((selectedFilter) => selectedFilter.style);
  const prompt = `${promptValue.trim()}${styles.length > 0 ? `, ${styles.join(", ").toLowerCase()}` : ""} ${ratio}`;  
  const isEmpty = !prompt || prompt.length <= 1;

  const handleClear = () => {
    setClear();
    setPromptValue("");
    setSelectedAspectRatio(aspectRatios[0]);
    setSelectedFilters([styleFilters[0]]);
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
    <main className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
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
            <div className="ml-auto flex space-x-2">
              <>
                <Button
                  onClick={handlePreviousImage}
                  disabled={isLoading || isFirst}
                  variant="outline"
                >
                  <UndoIcon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Undo</span>
                </Button>
                <Button
                  onClick={handleNextImage}
                  disabled={isLoading || isLast || !hasImages}
                  variant="outline"
                >
                  <RedoIcon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Redo</span>
                </Button>
                <Button
                  onClick={handleClear}
                  variant="secondary"
                  disabled={isEmpty}
                >
                  <Trash2Icon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Clear</span>
                </Button>
              </>
              <Button
                onClick={async () => generateImage(prompt)}
                disabled={isLoading}
              >
                {isGenerationLoading ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BrushIcon className="h-4 w-4 md:mr-2" />
                )}
                <span className="hidden md:block">Generate</span>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <TextareaPrompt />
          <SideColumn className="lg:hidden" />
          <ImageContainer />
          <motion.div layout className="flex justify-center space-x-2">
            <motion.div layout className="flex-center mt-4">
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
            </motion.div>
            <motion.div layout className="flex-center mt-4">
              <Button
                onClick={async () => upscaleImage(imageSelected, currentImage)}
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
            </motion.div>
            {isImageUpscaled && (
              <motion.div layout className="flex-center mt-4">
                <Button
                  onClick={async () =>
                    uploadImage(currentImage, promptValue, ratioValue, styles[0])
                  }
                  disabled={isUploadLoading || isImageUploaded}
                  variant="success"
                >
                  {isUploadLoading ? (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <SaveIcon className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="bg-background flex-center sticky bottom-0 h-6 border-t">
        <p className="px-4 text-xs">{message}</p>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
