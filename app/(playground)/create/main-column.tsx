"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMobileMenuStore } from "~/store/mobileMenuStore";
import removeSpacesFromString from "~/utils/removeSpacesFromString";
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
  ZoomOutIcon,
} from "lucide-react";
import type { MJMessage } from "midjourney";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import FiltersBadge from "./components/badge/filters-badge";
import ActionButton from "./components/buttons/action-button";
import FiltersDialog from "./components/dialog/filters-dialog";
import ImageContainer from "./components/image/image-container";
import TextareaPrompt from "./components/input/textarea-prompt";
import { aspectRatios } from "./data/aspectRatios";
import { imagine } from "./lib/request";
import SideColumn from "./side-column";
import { useChaosStore } from "./store/chaosStore";
import { useFilterStore } from "./store/filterStore";
import { useMessageStore } from "./store/messageStore";
import { usePromptStore } from "./store/promptStore";
import { useQualityStore } from "./store/qualityStore";
import { useRatioStore } from "./store/ratioStore";
import { useSeedStore } from "./store/seedStore";
import { useStopStore } from "./store/stopStore";
import { useStylizeStore } from "./store/stylizeStore";
import { useTileStore } from "./store/tileStore";
import { useVersionStore } from "./store/versionStore";

const MainColumn = () => {
  const [messages, setMessages, clearMessages] = useMessageStore((state) => [
    state.messages,
    state.setMessages,
    state.clearMessages,
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
  const isMobileMenuOpen = useMobileMenuStore(
    (state) => state.isMobileMenuOpen
  );
  const { data: session, update } = useSession();
  const username = session?.user.username;
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasFilters = selectedFilters.length > 0;
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
  const version = versionValue === "--v 5.2" ? "" : ` ${versionValue}`;
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

  const trimmedPromptValue = removeSpacesFromString(promptValue);

  // FINAL PROMPT
  const prompt = `${trimmedPromptValue}${
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
    clearMessages();
    setPromptValue("");
    setSelectedAspectRatio(aspectRatios[0]);
    setChaosValue(0);
    setQualityValue(1);
    setStopValue(100);
    setStylizeValue(100);
    setVersionValue("--v 5.2");
    setSeedValue(undefined);
    resetTileValue();
    clearFilters();
    handleDisableSelectors(false);
  };

  // const imagineMutation = useMutation({
  //   mutationFn: async () =>
  //     imagine(prompt, (data: MJMessage) => {
  //       setMessages(data);
  //     }),
  // });

  const handleGenerate = async () => {
    if (promptValue.length <= 1) {
      inputRef.current?.focus();
      return;
    }
    handleDisableSelectors(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
    // await imagineMutation.mutateAsync();
    await imagine(prompt, (data: MJMessage) => {
      setMessages(data);
    });
  };

  return (
    <main className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
      <div className="h-full grow px-4 py-6 xl:px-8">
        <div className="h-full flex-col border-none p-0">
          <div
            className={cn(
              "flex w-full items-center justify-between bg-background -lg:fixed -lg:left-0 -lg:z-10 -lg:h-[80px] -lg:border-b -lg:px-4 -lg:py-6",
              {
                "-lg:top-14": !isMobileMenuOpen,
                "-lg:top-[6.5rem]": isMobileMenuOpen,
              }
            )}
          >
            <div className="space-y-1 -xs:hidden">
              <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">
                Poster generation
              </h2>
              <p className="text-sm text-muted-foreground">
                Create your own poster
              </p>
            </div>
            <div className="ml-auto flex space-x-2">
              <>
                {/*<Button*/}
                {/*  onClick={handlePreviousImage}*/}
                {/*  disabled={isLoading || isFirst}*/}
                {/*  variant="outline"*/}
                {/*>*/}
                {/*  <UndoIcon className="h-4 w-4 md:mr-2" />*/}
                {/*  <span className="hidden md:block">Undo</span>*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*  onClick={handleNextImage}*/}
                {/*  disabled={isLoading || isLast || !hasImages}*/}
                {/*  variant="outline"*/}
                {/*>*/}
                {/*  <RedoIcon className="h-4 w-4 md:mr-2" />*/}
                {/*  <span className="hidden md:block">Redo</span>*/}
                {/*</Button>*/}
                <Button
                  onClick={handleClear}
                  variant="secondary"
                  disabled={isEmpty}
                >
                  <Trash2Icon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">Clear</span>
                </Button>
              </>
              <ActionButton
                label="Generate"
                Icon={BrushIcon}
                clickHandler={handleGenerate}
                // isLoading={isLoading}
                isDisabled={isEmpty}
              />
              {/*<Button onClick={handleGenerate} disabled={isLoading}>*/}
              {/*  {isGenerationLoading ? (*/}
              {/*    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
              {/*  ) : (*/}
              {/*    <BrushIcon className="h-4 w-4 md:mr-2" />*/}
              {/*  )}*/}
              {/*  <span className="hidden md:block">Generate</span>*/}
              {/*</Button>*/}
            </div>
          </div>
          <Separator className="my-4 -lg:hidden" />
          <div className="-lg:mt-20">
            {hasFilters && <FiltersBadge />}
            <TextareaPrompt
              inputRef={inputRef}
              generateHandler={handleGenerate}
              collapse={hasFilters}
            />
            <SideColumn className="lg:hidden" />
            <ImageContainer className="" />
            {/*<motion.div layout className="flex justify-center space-x-2">*/}
            {/*  {isImageUpscaled ? (*/}
            {/*    <>*/}
            {/*      <motion.div layout className="flex-center mt-4">*/}
            {/*        <Button*/}
            {/*          onClick={async () =>*/}
            {/*            variationImage(*/}
            {/*              imageSelected,*/}
            {/*              currentImage,*/}
            {/*              "zoom-out x1.5"*/}
            {/*            )*/}
            {/*          }*/}
            {/*          disabled={isLoading || imageSelected === 0}*/}
            {/*          variant="outline"*/}
            {/*        >*/}
            {/*          {isVariationLoading ? (*/}
            {/*            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*          ) : (*/}
            {/*            <ZoomOutIcon className="mr-2 h-4 w-4" />*/}
            {/*          )}*/}
            {/*          Zoom out x1.5*/}
            {/*        </Button>*/}
            {/*      </motion.div>*/}
            {/*      <motion.div layout className="flex-center mt-4">*/}
            {/*        <Button*/}
            {/*          onClick={async () =>*/}
            {/*            variationImage(*/}
            {/*              imageSelected,*/}
            {/*              currentImage,*/}
            {/*              "zoom-out x2"*/}
            {/*            )*/}
            {/*          }*/}
            {/*          disabled={isLoading || imageSelected === 0}*/}
            {/*          variant="secondary"*/}
            {/*        >*/}
            {/*          {isUpscaleLoading ? (*/}
            {/*            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*          ) : (*/}
            {/*            <ZoomOutIcon className="mr-2 h-4 w-4" />*/}
            {/*          )}*/}
            {/*          Zoom out x2*/}
            {/*        </Button>*/}
            {/*      </motion.div>*/}
            {/*    </>*/}
            {/*  ) : (*/}
            {/*    <>*/}
            {/*      <motion.div layout className="flex-center mt-4">*/}
            {/*        <Button*/}
            {/*          onClick={async () =>*/}
            {/*            variationImage(imageSelected, currentImage)*/}
            {/*          }*/}
            {/*          disabled={*/}
            {/*            isLoading || imageSelected === 0 || isImageUpscaled*/}
            {/*          }*/}
            {/*          variant="outline"*/}
            {/*        >*/}
            {/*          {isVariationLoading ? (*/}
            {/*            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*          ) : (*/}
            {/*            <IterationCcwIcon className="mr-2 h-4 w-4" />*/}
            {/*          )}*/}
            {/*          Variation*/}
            {/*        </Button>*/}
            {/*      </motion.div>*/}
            {/*      <motion.div layout className="flex-center mt-4">*/}
            {/*        <Button*/}
            {/*          onClick={async () =>*/}
            {/*            upscaleImage(prompt, imageSelected, currentImage)*/}
            {/*          }*/}
            {/*          disabled={*/}
            {/*            isLoading || imageSelected === 0 || isImageUpscaled*/}
            {/*          }*/}
            {/*          variant="secondary"*/}
            {/*        >*/}
            {/*          {isUpscaleLoading ? (*/}
            {/*            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*          ) : (*/}
            {/*            <ArrowBigUpIcon className="mr-2 h-4 w-4" />*/}
            {/*          )}*/}
            {/*          Upscale*/}
            {/*        </Button>*/}
            {/*      </motion.div>*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*  {isImageUpscaled && (*/}
            {/*    <motion.div layout className="flex-center mt-4">*/}
            {/*      <Button*/}
            {/*        onClick={async () =>*/}
            {/*          uploadImage(*/}
            {/*            currentImage,*/}
            {/*            promptValue,*/}
            {/*            ratioValue,*/}
            {/*            styles,*/}
            {/*            imageSelected,*/}
            {/*            options,*/}
            {/*            username*/}
            {/*          )*/}
            {/*        }*/}
            {/*        disabled={isUploadLoading}*/}
            {/*        variant="success"*/}
            {/*      >*/}
            {/*        {isUploadLoading ? (*/}
            {/*          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
            {/*        ) : (*/}
            {/*          <SaveIcon className="mr-2 h-4 w-4" />*/}
            {/*        )}*/}
            {/*        Save*/}
            {/*      </Button>*/}
            {/*    </motion.div>*/}
            {/*  )}*/}
            {/*</motion.div>*/}
          </div>
        </div>
      </div>
      {/*<div className="flex-center sticky bottom-0 h-6 border-t bg-background">*/}
      {/*  <p*/}
      {/*    className={cn("px-4 text-xs", {*/}
      {/*      "text-red-500": isError,*/}
      {/*    })}*/}
      {/*  >*/}
      {/*    {message}*/}
      {/*  </p>*/}
      {/*</div>*/}
      <FiltersDialog />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
