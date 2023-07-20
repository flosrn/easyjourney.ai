"use client";

import React, { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BrushIcon, Trash2Icon } from "lucide-react";
import type { MJMessage } from "midjourney";
import { toast, Toaster } from "react-hot-toast";

import { Separator } from "~/components/ui/separator";
import { TabsContent } from "~/components/ui/tabs";

import { cn } from "~/lib/classNames";

import FiltersBadge from "./components/badge/filters-badge";
import ActionButton from "./components/buttons/action-button";
import ActionButtonsContainer from "./components/buttons/action-buttons-container";
import FiltersDialog from "./components/dialog/filters-dialog";
import ImageContainer from "./components/image/image-container";
import ImageContainerGrid from "./components/image/image-container-grid";
import TextareaPrompt from "./components/input/textarea-prompt";
import useSelectors from "./hooks/useSelectors";
import { generate, savePoster } from "./lib/request";
import { DisplayMode } from "./store/displayStore";
import { useMessageStore } from "./store/messageStore";
import { useMidjourneyStore } from "./store/midjourneyStore";

type MutationParams = {
  option?: string;
  newPrompt?: string;
};

const MainColumn = () => {
  const [messages, addMessage, setMessage, currentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.addMessage,
      state.setMessage,
      state.currentMessageIndex,
    ]);

  const [
    generationType,
    { isLoading, isSuccess },
    setRequestState,
    selectedImage,
    setGenerationType,
    setMsg,
    setSelectedImage,
  ] = useMidjourneyStore((state) => [
    state.generationType,
    state.requestState,
    state.setRequestState,
    state.selectedImage,
    state.setGenerationType,
    state.setMsg,
    state.setSelectedImage,
  ]);

  const {
    prompt,
    promptValue,
    options,
    hasFilters,
    isEmpty,
    handleClear,
    handleDisableSelectors,
  } = useSelectors();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;

  const generationMutation = useMutation<
    MJMessage | undefined,
    Error,
    MutationParams
  >({
    mutationFn: async ({ option, newPrompt }) => {
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
            option,
            newPrompt,
            loading: (data: MJMessage) => {
              if (data.progress === "waiting") return;
              setMsg(`Generating poster ${data.progress}`);
              if (generationType === "imagine") {
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
      // if (!data) setMsg("Something went wrong, please try again.");
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

  const handleGenerate = async (option?: string, newPrompt?: string) => {
    if (promptValue.length <= 1) {
      inputRef.current?.focus();
      return;
    }
    handleDisableSelectors(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
    await generationMutation.mutateAsync({ option, newPrompt });
  };

  useEffect(() => {
    if (isLoading) return;
    const message = messages[currentMessageIndex] as MJMessage | undefined;
    const msgGenerationType = message?.generationType;
    setSelectedImage(null);
    switch (msgGenerationType) {
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
      case "zoomOut":
        setMsg("Poster unZoomed! Click on one of the 4 images and upscale it!");
        break;
      case "vary":
        setMsg("Poster varied! Click on one of the 4 images and upscale it!");
        break;
      default:
        setMsg("");
        break;
    }
  }, [
    messages,
    currentMessageIndex,
    setSelectedImage,
    setMsg,
    isLoading,
    isSuccess,
  ]);

  return (
    <main className="relative flex flex-col overflow-x-hidden md:border-l">
      <div className="h-full p-4 md:p-6">
        <div className="h-full flex-col border-none p-0">
          <div
            className={cn(
              "flex w-full items-center justify-between bg-background -md:fixed -md:left-0 -md:z-10 -md:h-[80px] -md:border-b -md:px-4 -md:py-6"
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
                id="clear"
                label="Clear"
                Icon={Trash2Icon}
                clickHandler={handleClear}
                isDisabled={isEmpty}
              />
              <ActionButton
                id="imagine"
                type="imagine"
                label="Generate"
                variant="default"
                Icon={BrushIcon}
                clickHandler={handleGenerate}
                isDisabled={isLoading}
              />
            </div>
          </div>
          <Separator className="my-4 -md:hidden" />
          <div className="flex h-[calc(100%-80px)] min-h-[676px] flex-col space-y-4">
            {hasFilters && <FiltersBadge />}
            <TextareaPrompt
              inputRef={inputRef}
              generateHandler={handleGenerate}
              collapse={hasFilters}
            />

            <motion.div
              layout
              className="relative flex max-h-full grow items-center justify-center rounded-md border p-5 lg:py-1"
            >
              <TabsContent value={DisplayMode.STACK} className="w-full">
                <ImageContainer />
              </TabsContent>
              <TabsContent value={DisplayMode.GRID} className="w-full">
                <ImageContainerGrid />
              </TabsContent>
            </motion.div>

            <ActionButtonsContainer clickHandler={handleGenerate} />
          </div>
        </div>
      </div>
      <FiltersDialog />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
