"use client";

import React from "react";
import { ArrowBigUp, BrushIcon, Loader2, Trash2Icon, Undo } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
import { Separator } from "~/components/ui/Separator";

import ImageContainer from "./components/ImageContainer";
import TextareaPrompt from "./components/TextareaPrompt";
import Sidebar from "./components/sidebar/Sidebar";
import { useFilterStore } from "./store/filterStore";
import { useImageGenerationStore } from "./store/imageGenerationStore";
import { usePromptStore } from "./store/promptStore";
import { useRatioStore } from "./store/ratioStore";

const CreatePanel = () => {
  const selectedAspectRatio = useRatioStore(
    (state) => state.selectedAspectRatio
  );
  const selectedFilter = useFilterStore((state) => state.selectedFilter);
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  const [isLoading, generateImage, upscaleImage] = useImageGenerationStore(
    (state) => [state.isLoading, state.generateImage, state.upscaleImage]
  );
  const [
    image,
    upscaledImage,
    setUpscaledImage,
    imageSelected,
    setSelectedImage,
    setClear,
  ] = useImageGenerationStore((state) => [
    state.image,
    state.upscaledImage,
    state.setUpscaledImage,
    state.selectedImage,
    state.setSelectedImage,
    state.setClear,
  ]);

  const handleClear = () => {
    setClear();
    setPromptValue("");
  };

  const handleUndo = () => {
    setUpscaledImage(null);
    setSelectedImage(0);
  };

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
                    <div className="ml-auto space-x-2">
                      {(image || upscaledImage) && (
                        <>
                          {upscaledImage && (
                            <Button onClick={handleUndo} variant="outline">
                              <Undo className="mr-2 h-4 w-4" />
                              Undo
                            </Button>
                          )}
                          <Button onClick={handleClear} variant="secondary">
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Clear
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={async () => generateImage(promptValue)}
                        disabled={isLoading || !!upscaledImage}
                      >
                        {isLoading && !image ? (
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
                  {image && !upscaledImage && !imageSelected && (
                    <div className="flex-center mt-4">
                      Click on the image you want to upscale
                    </div>
                  )}
                  {image && !!imageSelected && (
                    <div className="flex-center mt-4">
                      <Button
                        onClick={async () =>
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-expect-error
                          upscaleImage(imageSelected, image)
                        }
                        disabled={isLoading || !!upscaledImage}
                        variant="secondary"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowBigUp className="mr-2 h-4 w-4" />
                        )}
                        Upscale
                      </Button>
                    </div>
                  )}
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
