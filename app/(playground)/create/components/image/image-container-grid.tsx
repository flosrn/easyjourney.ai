import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExpandIcon } from "lucide-react";
import type { MJMessage } from "midjourney";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
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
  const [{ isLoading }, selectedImage, setSelectedImage] = useMidjourneyStore(
    (state) => [state.requestState, state.selectedImage, state.setSelectedImage]
  );
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
        scrollAreaElement.scrollTo(0, scrollAreaElement.scrollHeight);
      }, 300);
    }
  }, [messages.length, currentMessageIndex]);

  const handleImageClick = (index: number) => {
    setCurrentMessageIndex(index);
  };

  const handleZoomChange = useCallback((index: number, shouldZoom: boolean) => {
    setIsZoomed((prevState) => ({ ...prevState, [index]: shouldZoom }));
  }, []);

  return (
    <ScrollArea ref={scrollAreaRef} type="always" className="h-[600px]">
      <ul className="flex flex-row flex-wrap content-end justify-center gap-4">
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
      </ul>
    </ScrollArea>
  );
};

export default ImageContainerGrid;
