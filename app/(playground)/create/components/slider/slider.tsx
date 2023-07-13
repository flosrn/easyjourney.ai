"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import { EffectCreative, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/parallax";
import "./styles.css";

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ExpandIcon,
} from "lucide-react";
import type { MJMessage } from "midjourney";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import { useRatioStore } from "../../store/ratioStore";
import { getTwAspectRatio } from "../image/aspectRatioUtils";
import { ImageGrid } from "../image/image-grid";

type SliderProps = {};

const Slider = ({}: SliderProps) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showImageGrid, setShowImageGrid] = useState<boolean>(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);
  const [messages, currentMessageIndex, setCurrentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.currentMessageIndex,
      state.setCurrentMessageIndex,
    ]);
  const [{ isLoading }, selectedImage, setSelectedImage] = useMidjourneyStore(
    (state) => [state.requestState, state.selectedImage, state.setSelectedImage]
  );
  const selectedAspectRatio = useRatioStore(
    (state) => state.selectedAspectRatio
  );
  const { value: ratio } = selectedAspectRatio;
  const swiperRef = React.useRef<any | null>(null);

  const hasImage = messages.length > 0;
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;
  const isImagine = currentGenerationType === "imagine";
  const isVariation = currentGenerationType === "variation";
  const isVary = currentGenerationType === "vary";
  const isZoomOut = currentGenerationType === "zoomOut";
  const hasImageGrid =
    hasImage && !isLoading && (isImagine || isVariation || isVary || isZoomOut);
  const aspectRatio = getTwAspectRatio(ratio);

  const calcNextOffset = () => {
    const parentWidth = swiperRef.current?.parentElement.offsetWidth;
    const swiperWidth = swiperRef.current?.offsetWidth;
    let nextOffset =
      (parentWidth - (parentWidth - swiperWidth) / 2) / swiperWidth;
    nextOffset = Math.max(nextOffset, 1);
    return `${nextOffset * 100}%`;
  };

  useEffect(() => {
    if (swiperRef.current && messages.length > 0) {
      swiperRef.current.swiper.slideTo(currentMessageIndex);
    }
  }, [messages.length, currentMessageIndex]);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.params.creativeEffect.next.translate = [
        calcNextOffset(),
        0,
        0,
      ];
    }
  }, [swiperRef]);

  useEffect(() => {
    if (hasImageGrid) {
      const timer = setTimeout(() => {
        setShowImageGrid(true);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowImageGrid(false);
    }
  }, [hasImageGrid]);

  return (
    <div className="posters-slider">
      <Swiper
        ref={swiperRef}
        effect="creative"
        speed={600}
        resistanceRatio={0}
        grabCursor={true}
        parallax={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        creativeEffect={{
          limitProgress: 3,
          perspective: true,
          shadowPerProgress: true,
          prev: {
            shadow: true,
            translate: ["-10%", 0, -200],
          },
          next: {},
        }}
        modules={[Parallax, EffectCreative, Navigation]}
        onSlideChange={(swiper) => setCurrentMessageIndex(swiper.activeIndex)}
      >
        {messages.map((message, index) => (
          <SwiperSlide key={index}>
            <div
              className={cn(
                "flex-center lg:h-[500px] rounded-md relative",
                aspectRatio
              )}
            >
              {index === messages.length - 1 && message.attachment && (
                <>
                  <div className="absolute left-0 top-0">
                    <ControlledZoom
                      isZoomed={isZoomed}
                      onZoomChange={handleZoomChange}
                      zoomMargin={30}
                    >
                      <img src={message.uri} alt="" className="rounded-md" />
                    </ControlledZoom>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="flex-center absolute right-0 top-0 z-50 p-2 opacity-50 hover:opacity-100"
                    >
                      <ExpandIcon className="h-4 w-4" />
                    </motion.button>
                  </div>
                </>
              )}

              <img
                data-swiper-parallax-scale={1.1}
                src={message.uri}
                alt=""
                className={cn("rounded-md", {
                  "img-dimmed": index !== currentMessageIndex,
                })}
              />

              {showImageGrid &&
                hasImageGrid &&
                message.attachment &&
                index === currentMessageIndex && (
                  <ImageGrid
                    selectedImage={selectedImage}
                    clickHandler={setSelectedImage}
                  />
                )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex-center mt-2 space-x-10">
        <Button variant="ghost" className="swiper-button-prev">
          <ArrowLeftCircleIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="swiper-button-next">
          <ArrowRightCircleIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Slider;
