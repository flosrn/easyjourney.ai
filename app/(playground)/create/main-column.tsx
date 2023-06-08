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
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import FiltersBadge from "./components/badge/filters-badge";
import FiltersDialog from "./components/dialog/filters-dialog";
import ImageContainer from "./components/image/image-container";
import TextareaPrompt from "./components/input/textarea-prompt";
import { aspectRatios } from "./data/aspectRatios";
import { handleMessageData } from "./lib/imageGenerationUtils";
import SideColumn from "./side-column";
import { useChaosStore } from "./store/chaosStore";
import { useFilterStore } from "./store/filterStore";
import { useImageGenerationStore } from "./store/imageGenerationStore";
import { usePromptStore } from "./store/promptStore";
import { useQualityStore } from "./store/qualityStore";
import { useRatioStore } from "./store/ratioStore";
import { useSeedStore } from "./store/seedStore";
import { useStopStore } from "./store/stopStore";
import { useStylizeStore } from "./store/stylizeStore";
import { useTileStore } from "./store/tileStore";
import { useVersionStore } from "./store/versionStore";

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

  const [chaosValue, setChaosValue, setIsChaosSelectorDisabled] = useChaosStore(
    (state) => [
      state.chaosValue,
      state.setChaosValue,
      state.setIsChaosSelectorDisabled,
      state.isChaosSelectorDisabled,
    ]
  );
  const [qualityValue, setQualityValue, setIsQualitySelectorDisabled] =
    useQualityStore((state) => [
      state.qualityValue,
      state.setQualityValue,
      state.setIsQualitySelectorDisabled,
    ]);
  const [stopValue, setStopValue, setIsStopSelectorDisabled] = useStopStore(
    (state) => [
      state.stopValue,
      state.setStopValue,
      state.setIsStopSelectorDisabled,
    ]
  );
  const [stylizeValue, setStylizeValue, setIsStylizeSelectorDisabled] =
    useStylizeStore((state) => [
      state.stylizeValue,
      state.setStylizeValue,
      state.setIsStylizeSelectorDisabled,
    ]);
  const [tileValue, resetTileValue, setIsTileSelectorDisabled] = useTileStore(
    (state) => [
      state.tileValue,
      state.resetTileValue,
      state.setIsTileSelectorDisabled,
    ]
  );
  const [versionValue, setVersionValue, setIsVersionSelectorDisabled] =
    useVersionStore((state) => [
      state.versionValue,
      state.setVersionValue,
      state.setIsVersionSelectorDisabled,
    ]);
  const [seedValue, setSeedValue, setIsSeedSelectorDisabled] = useSeedStore(
    (state) => [
      state.seedValue,
      state.setSeedValue,
      state.setIsSeedSelectorDisabled,
    ]
  );
  const [
    selectedAspectRatio,
    setSelectedAspectRatio,
    setIsAspectRatioSelectorDisabled,
  ] = useRatioStore((state) => [
    state.selectedAspectRatio,
    state.setSelectedAspectRatio,
    state.setIsAspectRatioSelectorDisabled,
  ]);
  const [selectedFilters, clearFilters, setIsFilterSelectorDisabled] =
    useFilterStore((state) => [
      state.selectedFilters,
      state.clearFilters,
      state.setIsFilterSelectorDisabled,
    ]);
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  const { data: session } = useSession();
  const username = session?.user.username;

  const hasImages = images.length > 0;
  const hasFilters = selectedFilters.length > 0;
  const currentImage = images[imageIndex];
  const isFirst = imageIndex === 0;
  const isLast = imageIndex === images.length - 1;
  const isGenerationLoading = isLoading && loadingType === "generation";
  const isUpscaleLoading = isLoading && loadingType === "upscale";
  const isVariationLoading = isLoading && loadingType === "variation";
  const isUploadLoading = isLoading && loadingType === "upload";
  const isImageUpscaled = imageType === "upscale";
  const { ratio, value: ratioValue } = selectedAspectRatio;
  const styles = selectedFilters
    .map((selectedFilter) => selectedFilter.style)
    .join(", ")
    .toLowerCase();

  // OPTIONS
  const chaos = chaosValue === 0 ? "" : ` --c ${chaosValue}`;
  const stylize = stylizeValue === 100 ? "" : ` --stylize ${stylizeValue}`;
  const stop = stopValue === 100 ? "" : ` --stop ${stopValue}`;
  const quality = qualityValue === 1 ? "" : ` --quality ${qualityValue}`;
  const version = versionValue === "--v 5.1" ? "" : ` ${versionValue}`;
  const tile = tileValue ? ` --tile` : "";
  const ratioTrim = ratio ? ` ${ratio}` : "";
  const seed = seedValue ? ` --seed ${seedValue}` : "";
  const options = {
    chaos: chaosValue,
    stylize: stylizeValue,
    stop: stopValue,
    quality: qualityValue,
    version: versionValue,
    tile: tileValue,
    seed: seedValue,
  };

  const hasOption =
    chaos || stylize || stop || quality || version || tile || ratio;

  // FINAL PROMPT
  const prompt = `${promptValue.trim()}${
    styles.length > 0 ? `, ${styles}` : ""
  }${
    hasOption ? "," : ""
  }${ratioTrim}${chaos}${quality}${stop}${stylize}${tile}${version}${seed}`;

  const isEmpty = !prompt || prompt.length <= 1;

  const handleDisableSelectors = (value: boolean) => {
    setIsChaosSelectorDisabled(value);
    setIsQualitySelectorDisabled(value);
    setIsStopSelectorDisabled(value);
    setIsStylizeSelectorDisabled(value);
    setIsTileSelectorDisabled(value);
    setIsVersionSelectorDisabled(value);
    setIsSeedSelectorDisabled(value);
    setIsAspectRatioSelectorDisabled(value);
    setIsFilterSelectorDisabled(value);
  };

  const handleClear = () => {
    setClear();
    setPromptValue("");
    setSelectedAspectRatio(aspectRatios[0]);
    setChaosValue(0);
    setQualityValue(1);
    setStopValue(100);
    setStylizeValue(100);
    setVersionValue("--v 5.1");
    setSeedValue(undefined);
    resetTileValue();
    clearFilters();
    handleDisableSelectors(false);
  };

  const handleGenerate = async () => {
    handleDisableSelectors(true);
    await generateImage(prompt);
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
              <p className="text-sm text-muted-foreground">
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
              <Button onClick={handleGenerate} disabled={isLoading}>
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
          {hasFilters && <FiltersBadge />}
          <TextareaPrompt
            generateHandler={handleGenerate}
            collapse={hasFilters}
          />
          <SideColumn className="lg:hidden" />
          <ImageContainer className="" />
          <motion.div layout className="flex justify-center space-x-2">
            <motion.div layout className="flex-center mt-4">
              <Button
                onClick={async () =>
                  variationImage(imageSelected, currentImage)
                }
                disabled={isLoading || imageSelected === 0 || isImageUpscaled}
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
                disabled={isLoading || imageSelected === 0 || isImageUpscaled}
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
                    uploadImage(
                      currentImage,
                      promptValue,
                      ratioValue,
                      styles,
                      imageSelected,
                      options,
                      username
                    )
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
      <div className="flex-center sticky bottom-0 h-6 border-t bg-background">
        <p className="px-4 text-xs">{message}</p>
      </div>
      <FiltersDialog />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
