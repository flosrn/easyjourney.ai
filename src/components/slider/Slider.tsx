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

const frameData = [
  {
    index: 0,
    src: "",
    alt: "White wall with a poster",
    position:
      "absolute z-10 w-9/12 left-1/2 transform top-0 -translate-x-1/2 rounded-md",
  },
  {
    index: 1,
    src: "/images/backgrounds/sliderBackground2.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-4/12 left-[13%] top-[13%]",
  },
  {
    index: 2,
    src: "/images/backgrounds/sliderBackground3.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-2/12 left-[48%] top-[24%]",
  },
  {
    index: 3,
    src: "/images/backgrounds/sliderBackground4.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-5/12 left-[40%] top-[13%]",
  },
  {
    index: 4,
    src: "/images/backgrounds/sliderBackground5.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-4/12 left-[30%] top-[5%] -skew-y-3",
  },
  {
    index: 5,
    src: "/images/backgrounds/sliderBackground6.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-2/12 left-[74.5%] top-[18.5%]",
  },
];

type SliderProps = {
  prompt: string;
  image: string;
};

const Slider = ({ prompt, image }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
            className="h-[600px]"
          >
            {frameData.map((frame) => (
              <SwiperSlide key={frame.src}>
                {frame.src && (
                  <Image
                    alt={frame.alt}
                    src={frame.src}
                    width="1280" //images must be imported in 1280x1280 to correctly fit
                    height="1280"
                    quality="80"
                    className="rounded-md"
                  />
                )}
                <Image
                  alt={prompt}
                  src={image}
                  height="400"
                  width="400"
                  className={`${frameData[activeIndex].position} h-full transition-all duration-300`}
                />
              </SwiperSlide>
            ))}
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
          className="mt-4 h-[136px]"
        >
          {frameData.map((frame) => (
            <SwiperSlide
              key={frame.index}
              className={cn("overflow-hidden rounded-md", {
                "border-2 border-solid border-blue-500":
                  activeIndex === frame.index,
              })}
            >
              {frame.src && (
                <Image
                  alt={frame.alt}
                  src={frame.src}
                  width="1280"
                  height="1280"
                  quality="80"
                />
              )}
              <Image
                alt={prompt}
                src={image}
                height="400"
                width="400"
                className={`${frame.position} h-full`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
