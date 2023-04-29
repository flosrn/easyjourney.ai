"use client";

import React from "react";
import { BrushIcon, Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";

import ImageContainer from "./components/ImageContainer";
import Sidebar from "./components/Sidebar";
import TextareaPrompt from "./components/TextareaPrompt";
import { useFilterStore } from "./store/filterStore";
import { useImageGenerationStore } from "./store/imageGenerationStore";
import { usePromptStore } from "./store/promptStore";
import { useRatioStore } from "./store/ratioStore";

const CreatePanel = () => {
  const selectedAspectRatio = useRatioStore(
    (state) => state.selectedAspectRatio
  );
  const selectedFilter = useFilterStore((state) => state.selectedFilter);
  const promptValue = usePromptStore((state) => state.promptValue);
  const [isLoading, generateImage] = useImageGenerationStore((state) => [
    state.isLoading,
    state.generateImage,
  ]);

  return (
    <>
      <div className="h-[calc(100vh-57px)]">
        <div className="bg-background h-full">
          <div className="grid h-full lg:grid-cols-5">
            <Sidebar className="hidden p-4 lg:block xl:px-8" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 xl:px-8">
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
                    <div className="ml-auto">
                      <Button
                        onClick={async () => generateImage(promptValue)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};

export default CreatePanel;
