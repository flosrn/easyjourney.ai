"use client";

import React, { useRef } from "react";
import wait from "~/utils/wait";
import { motion } from "framer-motion";
import {
  BrushIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Trash2Icon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Separator } from "~/components/ui/separator";
import { TabsContent } from "~/components/ui/tabs";

import FiltersBadge from "./components/badge/filters-badge";
import ActionButton from "./components/buttons/action-button";
import ActionButtonsContainer from "./components/buttons/action-buttons-container";
import FiltersDialog from "./components/dialog/filters-dialog";
import ImageContainer from "./components/image/image-container";
import ImageContainerGrid from "./components/image/image-container-grid";
import TextareaPrompt from "./components/input/textarea-prompt";
import useGeneration from "./hooks/useGeneration";
import useSelectors from "./hooks/useSelectors";
import useTutorial from "./hooks/useTutorial";
import { DisplayMode } from "./store/displayStore";
import { useMidjourneyStore } from "./store/midjourneyStore";

import "driver.js/dist/driver.css";

import { useColumnStore } from "./store/columnStore";

const MainColumn = () => {
  const { status } = useSession();
  const [{ isLoading }] = useMidjourneyStore((state) => [state.requestState]);
  const { generationMutation } = useGeneration();
  const {
    promptValue,
    hasFilters,
    isEmpty,
    handleClear,
    handleDisableSelectors,
  } = useSelectors();
  const [showRightColumn, setShowRightColumn] = useColumnStore((state) => [
    state.showRightColumn,
    state.setShowRightColumn,
  ]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useTutorial({ inputRef, status });

  const handleGenerate = async (option?: string, newPrompt?: string) => {
    if (promptValue.length <= 1) {
      inputRef.current?.focus();
      return;
    }
    handleDisableSelectors(true);
    await wait(100);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    await generationMutation.mutateAsync({ option, newPrompt });
  };

  return (
    <main className="relative flex flex-col overflow-x-hidden md:border-l">
      <div className="h-full p-4 md:p-6">
        <div className="h-full flex-col border-none p-0">
          <div className="flex w-full items-center justify-between bg-background -md:fixed -md:left-0 -md:top-16 -md:z-10 -md:border-b -md:p-3">
            <div className="space-y-1 -xs:hidden">
              <h2
                id="title"
                className="text-xl font-semibold tracking-tight lg:text-2xl"
              >
                Poster generation
              </h2>
              <p className="text-sm text-muted-foreground">
                Create your own poster
              </p>
            </div>
            <div className="ml-auto flex space-x-2 md:mt-3">
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
                tourAction="destroy"
                Icon={BrushIcon}
                clickHandler={handleGenerate}
                isDisabled={isLoading}
              />
            </div>
          </div>
          <Separator className="my-4 -md:hidden" />
          <div className="flex h-[calc(100%-80px)] min-h-[676px] flex-col space-y-4">
            {hasFilters && <FiltersBadge />}
            <TextareaPrompt inputRef={inputRef} collapse={hasFilters} />
            <motion.div
              layout
              className="relative flex max-h-full grow items-center justify-center rounded-md border p-5 lg:py-1"
            >
              <TabsContent
                id="main-panel"
                value={DisplayMode.STACK}
                className="w-full"
              >
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
      <button
        onClick={() => setShowRightColumn(!showRightColumn)}
        className="absolute right-0 top-2 rounded-l-full border-y border-l bg-background"
      >
        {showRightColumn ? (
          <ChevronRightIcon size={24} className="ml-1" />
        ) : (
          <ChevronLeftIcon size={24} className="mr-1" />
        )}
      </button>
    </main>
  );
};

export default MainColumn;
