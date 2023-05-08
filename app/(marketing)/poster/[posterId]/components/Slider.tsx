import {
  A11y,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  type Swiper as SwiperClass,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import React, { useState } from "react";
import Image from "next/image";

import { cn } from "~/lib/classNames";

import frameData from "../data/frameData";
import ratioPositions from "../data/ratioPositions";

type SliderProps = {
  prompt: string;
  image: string;
  height: number | undefined;
  width: number | undefined;
  ratio: string;
};

const Slider = ({ prompt, image, height, width, ratio }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const findPositionThroughRatio = () => {
    const ratioObject = ratioPositions.find(
      (item) => item.ratio === (ratio || "1/1")
    );
    return ratioObject ? ratioObject.positions : ratioPositions[0].positions;
  };

  const positions: string[] = findPositionThroughRatio();
  const position = positions[activeIndex];

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            navigation
            thumbs={{ swiper: thumbsSwiper?.destroyed ? null : thumbsSwiper }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="relative h-[668px]"
          >
            {frameData.map((frame) => (
              <SwiperSlide key={frame.src}>
                {frame.src && (
                  <Image
                    alt={frame.alt}
                    src={frame.src}
                    width="1280"
                    height="1280"
                    quality="80"
                    className="h-full"
                  />
                )}
              </SwiperSlide>
            ))}
            <Image
              alt={prompt}
              src={image}
              width={width ?? "1280"}
              height={height ?? "1280"}
              className={`${position} h-full transition-all duration-300`}
            />
          </Swiper>
        </div>

        <Swiper
          onSwiper={(swipe) => setThumbsSwiper(swipe)}
          spaceBetween={15}
          slidesPerView={4.5}
          mousewheel={true}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="mt-4"
        >
          {frameData.map((frame) => (
            <SwiperSlide
              key={frame.index}
              className={cn("overflow-hidden h-auto w-full rounded-md", {
                "border-2 border-solid border-blue-500":
                  activeIndex === frame.index,
              })}
            >
              {frame.src && (
                <Image
                  alt={frame.alt}
                  src={frame.src}
                  width="400"
                  height="400"
                  quality="80"
                  className=" bg-black"
                />
              )}
              <Image
                alt={prompt}
                src={image}
                width={width ?? "1280"}
                height={height ?? "1280"}
                className={`${positions[frame.index]}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
