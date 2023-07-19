import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExpandIcon } from "lucide-react";
import type { MJMessage } from "midjourney";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import ImageContainerNoPoster from "./image-container-no-poster";
import { ImageGrid } from "./image-grid";

type ImageContainerGridProps = {};

const ImageContainerGrid = ({}: ImageContainerGridProps) => {
  const [isZoomed, setIsZoomed] = useState<Record<number, boolean>>({});
  const [messages, currentMessageIndex, setCurrentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.currentMessageIndex,
      state.setCurrentMessageIndex,
    ]);
  const [{ isLoading }, selectedImage, setSelectedImage, msg, generationType] =
    useMidjourneyStore((state) => [
      state.requestState,
      state.selectedImage,
      state.setSelectedImage,
      state.msg,
      state.generationType,
    ]);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const hasImage = messages.length > 0;
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;
  const isImagine = currentGenerationType === "imagine";
  const isVariation = currentGenerationType === "variation";
  const isVary = currentGenerationType === "vary";
  const isZoomOut = currentGenerationType === "zoomOut";
  const hasImageGrid =
    hasImage && !isLoading && (isImagine || isVariation || isVary || isZoomOut);

  useEffect(() => {
    if (messages.length > 0 && scrollAreaRef.current) {
      const scrollAreaElement = scrollAreaRef.current;
      setTimeout(() => {
        scrollAreaElement.scrollTo({
          top: scrollAreaElement.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [messages.length, isLoading]);

  const handleImageClick = (index: number) => {
    setCurrentMessageIndex(index);
  };

  const handleZoomChange = useCallback((index: number, shouldZoom: boolean) => {
    setIsZoomed((prevState) => ({ ...prevState, [index]: shouldZoom }));
  }, []);

  return (
    <>
      {generationType === "save" && isLoading && (
        <span className="flex-center absolute left-1/2 top-3 z-10 mb-2 h-6 w-full -translate-x-1/2 text-xs sm:text-sm">
          {msg}
        </span>
      )}
      <ScrollArea ref={scrollAreaRef} type="always" className="h-[518px]">
        <ul className="flex flex-wrap gap-4">
          {!hasImage && !isLoading && (
            <ImageContainerNoPoster className="h-[300px]" />
          )}
          {messages.map((message, index) => (
            <li className="relative flex h-1/4 w-1/4 rounded-md" key={index}>
              <ControlledZoom
                isZoomed={isZoomed[index]}
                onZoomChange={() => handleZoomChange(index, false)}
                zoomMargin={30}
              >
                <img
                  src={message.uri}
                  onClick={() => handleImageClick(index)}
                  alt=""
                  className={cn("!cursor-pointer rounded-md", {
                    "border border-primary": index === currentMessageIndex,
                    "opacity-80": index !== currentMessageIndex,
                  })}
                />
                {message.attachment && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleZoomChange(index, true)}
                    className="flex-center absolute right-0 top-0 z-50 p-2 opacity-50 hover:opacity-100"
                  >
                    <ExpandIcon className="h-4 w-4" />
                  </motion.button>
                )}
                {hasImageGrid &&
                  message.attachment &&
                  index === currentMessageIndex && (
                    <ImageGrid
                      selectedImage={selectedImage}
                      clickHandler={setSelectedImage}
                    />
                  )}
              </ControlledZoom>
            </li>
          ))}
          {isLoading && generationType !== "save" && (
            <ImageContainerNoPoster size="sm" className="flex w-1/4" />
          )}
        </ul>
      </ScrollArea>
    </>
  );
};

export default ImageContainerGrid;
