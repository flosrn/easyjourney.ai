"use client";

import React, { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMobileMenuStore } from "~/store/mobileMenuStore";
import removeSpacesFromString from "~/utils/removeSpacesFromString";
import { motion } from "framer-motion";
import { BrushIcon, Trash2Icon } from "lucide-react";
import type { MJMessage } from "midjourney";
import { toast, Toaster } from "react-hot-toast";

import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import FiltersBadge from "./components/badge/filters-badge";
import ActionButton from "./components/buttons/action-button";
import ActionButtonsContainer from "./components/buttons/action-buttons-container";
import FiltersDialog from "./components/dialog/filters-dialog";
import ImageContainer from "./components/image/image-container";
import TextareaPrompt from "./components/input/textarea-prompt";
import { aspectRatios } from "./data/aspectRatios";
import { generate, savePoster } from "./lib/request";
import SideColumn from "./side-column";
import { useChaosStore } from "./store/chaosStore";
import { useFilterStore } from "./store/filterStore";
import { useMessageStore } from "./store/messageStore";
import { useMidjourneyStore } from "./store/midjourneyStore";
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
    messages,
    addMessage,
    setMessage,
    currentMessageIndex,
    setCurrentMessageIndex,
    clearMessages,
  ] = useMessageStore((state) => [
    state.messages,
    state.addMessage,
    state.setMessage,
    state.currentMessageIndex,
    state.setCurrentMessageIndex,
    state.clearMessages,
  ]);

  const [
    generationType,
    { isLoading, isSuccess, isError },
    setRequestState,
    selectedImage,
    setGenerationType,
    msg,
    setMsg,
    setSelectedImage,
  ] = useMidjourneyStore((state) => [
    state.generationType,
    state.requestState,
    state.setRequestState,
    state.selectedImage,
    state.setGenerationType,
    state.msg,
    state.setMsg,
    state.setSelectedImage,
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;

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
    textPrompt: promptValue,
    style: styles,
    ratio: ratioValue,
    chaos: chaosValue,
    stylize: stylizeValue,
    stop: stopValue,
    quality: qualityValue,
    model: versionValue,
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
    setSelectedImage(null);
    setMsg("");
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

  const generationMutation = useMutation({
    mutationFn: async () => {
      const result = await (currentMessage && generationType === "save"
        ? savePoster({
            poster: currentMessage,
            options,
            selectedImage,
          })
        : generate({
            generationType,
            prompt,
            content: currentMessage,
            index: selectedImage,
            loading: (data: MJMessage) => {
              console.log("data :", data);
              if (data.progress === "waiting") return;
              setMsg(`Generating poster ${data.progress}`);
              if (generationType !== "variation") {
                addMessage(data);
              } else if (data.progress === "done") {
                addMessage(data);
              }
            },
          }));
      return result;
    },
    onMutate: () => {
      console.log("onMutate");
      setRequestState({ isLoading: true, isSuccess: false, isError: false });
    },
    onError: (error) => {
      console.log("onError:", error);
      setMsg(`Error: ${error.message}`);
      setRequestState({ isError: true, isLoading: false });
      setGenerationType(null);
      toast.error("An error occurred, please try again.");
    },
    onSuccess: (data) => {
      console.log("onSuccess:", data);
      setSelectedImage(null);
      setRequestState({ isSuccess: true, isLoading: false });
      let actionWord = "generated";
      const isDataImagine = data?.generationType === "imagine";
      const isDataUpscale = data?.generationType === "upscale";
      const isDataVariation = data?.generationType === "variation";
      const isDataSave = data?.generationType === "save";
      if (isDataImagine || isDataVariation) {
        actionWord = "generated";
      } else if (isDataUpscale) {
        actionWord = "upscaled";
      } else if (isDataSave) {
        actionWord = "saved";
      }
      data && toast.success(`Poster successfully ${actionWord}!`);
      if (isDataSave) {
        const savedMessage = messages.find(
          (message) => message.jobId === data.jobId
        );
        const index = savedMessage && messages.indexOf(savedMessage);
        index && setMessage(index, { ...savedMessage, generationType: "save" });
      }
    },
    onSettled: () => {
      console.log("onSettled");
      setRequestState({ isLoading: false });
    },
  });

  const handleGenerate = async () => {
    if (promptValue.length <= 1) {
      inputRef.current?.focus();
      return;
    }
    handleDisableSelectors(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
    await generationMutation.mutateAsync();
  };

  useEffect(() => {
    setSelectedImage(null);
    switch (currentGenerationType) {
      case "imagine":
        setMsg("Click on one of the 4 images and upscale it!");
        break;
      case "variation":
        setMsg("Click on one of the 4 images and upscale it!");
        break;
      case "upscale":
        setMsg("Poster upscaled!");
        break;
      case "save":
        setMsg("Poster saved!");
        break;
      default:
        setMsg("");
        break;
    }
  }, [currentGenerationType, setSelectedImage, setMsg]);

  return (
    <main className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
      <div className="h-full p-4 lg:py-6 xl:px-8">
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
              <ActionButton
                variant="secondary"
                label="Clear"
                Icon={Trash2Icon}
                clickHandler={handleClear}
                isDisabled={isEmpty}
              />
              <ActionButton
                type="imagine"
                label="Generate"
                Icon={BrushIcon}
                clickHandler={handleGenerate}
                isDisabled={isEmpty || !!generationType}
              />
            </div>
          </div>
          <Separator className="my-4 -lg:hidden" />
          <div className="flex h-[calc(100%-80px)] flex-col space-y-4 -lg:mt-20">
            {hasFilters && <FiltersBadge />}
            <TextareaPrompt
              inputRef={inputRef}
              generateHandler={handleGenerate}
              collapse={hasFilters}
            />
            <SideColumn className="lg:hidden" />
            <motion.div
              layout
              className="flex max-h-full grow items-center justify-center rounded-md border p-5 lg:py-1"
            >
              <ImageContainer />
            </motion.div>

            <ActionButtonsContainer clickHandler={handleGenerate} />
          </div>
        </div>
      </div>
      <div className="flex-center sticky bottom-0 z-10 h-6 border-t bg-background">
        <p
          className={cn("px-4 text-xs", {
            "text-red-500": isError,
          })}
        >
          {msg}
        </p>
      </div>
      <FiltersDialog />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
