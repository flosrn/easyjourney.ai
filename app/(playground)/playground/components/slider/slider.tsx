"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ExpandIcon,
} from "lucide-react";
import type { MJMessage } from "midjourney";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import { EffectCreative, Navigation, Parallax } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import { useRatioStore } from "../../store/ratioStore";
import { useTutorialStore } from "../../store/tutorialStore";
import { getTwAspectRatio } from "../image/aspectRatioUtils";
import { ImageGrid } from "../image/image-grid";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/parallax";
import "./styles.css";

type SliderProps = {};

const Slider = ({}: SliderProps) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showImageGrid, setShowImageGrid] = useState<boolean>(false);
  const [
    driverJs,
    moveNextTutorialStep,
    isTutorialEnabled,
    setIsTutorialEnabled,
  ] = useTutorialStore((state) => [
    state.driverJs,
    state.moveNextTutorialStep,
    state.isTutorialEnabled,
    state.setIsTutorialEnabled,
  ]);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);

  const [messages, currentMessageIndex, setCurrentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.currentMessageIndex,
      state.setCurrentMessageIndex,
    ]);
  const [{ isLoading }, selectedImage, setSelectedImage, msg] =
    useMidjourneyStore((state) => [
      state.requestState,
      state.selectedImage,
      state.setSelectedImage,
      state.msg,
    ]);
  const selectedAspectRatio = useRatioStore(
    (state) => state.selectedAspectRatio
  );
  const { value: ratio } = selectedAspectRatio;
  const swiperRef = React.useRef<SwiperRef | null>(null);

  const hasImage = messages.length > 0;
  const currentMessage = messages[currentMessageIndex] as MJMessage | undefined;
  const currentGenerationType = currentMessage?.generationType;
  const isImagine = currentGenerationType === "imagine";
  const isVariation = currentGenerationType === "variation";
  const isVary = currentGenerationType === "vary";
  const isZoomOut = currentGenerationType === "zoomOut";
  const isPan = currentGenerationType === "pan";
  const isSquare = currentGenerationType === "square";
  const hasImageGrid =
    hasImage &&
    !isLoading &&
    (isImagine || isVariation || isVary || isZoomOut || isPan || isSquare);
  const aspectRatio = getTwAspectRatio(ratio);

  // useEffect(() => {
  //   setIsTutorialEnabled(true);
  //   console.log("isImagine :", isImagine);
  //   console.log("currentGenerationType :", currentGenerationType);
  //   moveNextTutorialStep({
  //     elDestination: ".swiper-slide-visible > #poster-imagine",
  //     timeout: 2000,
  //   });
  // }, [isImagine]);

  const calcNextOffset = () => {
    // @ts-expect-error: swiperRef need to be extended with HTMLElement
    const parentWidth = swiperRef.current?.parentElement.offsetWidth;
    // @ts-expect-error: swiperRef need to be extended with HTMLElement
    const swiperWidth = swiperRef.current?.offsetWidth;
    let nextOffset =
      (parentWidth - (parentWidth - swiperWidth) / 2) / swiperWidth;
    nextOffset = Math.max(nextOffset, 1);
    return `${nextOffset * 100}%`;
  };

  const handleArrowClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    const { classList } = event.currentTarget as HTMLButtonElement;
    const isPrev = classList.contains("swiper-button-prev");
    const isNext = classList.contains("swiper-button-next");
    if (isPrev) {
      driverJs?.moveNext();
    } else if (isNext) {
      moveNextTutorialStep({
        elDestination: "#more-options",
        timeout: 2000,
      });
    }
  };

  useEffect(() => {
    if (swiperRef.current && messages.length > 0) {
      swiperRef.current.swiper.slideTo(currentMessageIndex);
    }
  }, [messages.length, currentMessageIndex]);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      // @ts-expect-error: swiperRef need to be extended with HTMLElement
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
    <div className="posters-slider w-full">
      <span className="flex-center mb-2 h-7 text-center text-xs sm:text-sm md:h-6">
        {msg}
      </span>
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
              id={`poster-${message.generationType}`}
              className={cn(
                "flex-center md:h-[450px] rounded-md relative",
                aspectRatio
              )}
            >
              {message.attachment && index === currentMessageIndex && (
                <>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ControlledZoom
                      isZoomed={isZoomed}
                      onZoomChange={handleZoomChange}
                      zoomMargin={30}
                    >
                      <img
                        src={message.uri}
                        alt=""
                        className={cn("rounded-md", {
                          invisible: !isZoomed,
                        })}
                      />
                    </ControlledZoom>
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

              {/* https://github.com/rpearce/react-medium-image-zoom/issues/429 */}

              {/*{!isTutorialEnabled && index === currentMessageIndex && (*/}
              {/*  <motion.button*/}
              {/*    whileHover={{ scale: 1.1 }}*/}
              {/*    whileTap={{ scale: 0.9 }}*/}
              {/*    onClick={() => setIsZoomed((prev) => !prev)}*/}
              {/*    className="flex-center absolute right-0 top-0 z-50 p-2 opacity-80 hover:opacity-100"*/}
              {/*  >*/}
              {/*    <ExpandIcon className="h-4 w-4" />*/}
              {/*  </motion.button>*/}
              {/*)}*/}

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
      <div className="flex-center mt-2 flex-col space-y-2">
        <div id="slider-arrows" className="flex-center space-x-10">
          <Button
            onClick={handleArrowClick}
            variant="ghost"
            className="swiper-button-prev"
          >
            <ArrowLeftCircleIcon className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleArrowClick}
            variant="ghost"
            className="swiper-button-next"
          >
            <ArrowRightCircleIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
