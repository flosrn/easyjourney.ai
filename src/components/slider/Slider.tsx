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

const ratioPositions = [
  {
    ratio: "1/1",
    positions: [
      "absolute z-10 w-11/12 left-[5%] rounded-md",
      "absolute z-10 w-2/12 left-[74.5%] top-[20%]",
      "absolute z-10 w-4/12 left-[30%] top-[5%] -skew-y-3",

      "absolute z-10 w-5/12 left-[40%] top-[13%]",
      "absolute z-10 w-2/12 left-[48%] top-[26%]",
      "absolute z-10 w-4/12 left-[10%] top-[13%]",
    ],
  },
  {
    ratio: "4/5",
    positions: [
      "absolute z-10 h-full w-auto left-[15%] rounded-md",
      "absolute z-10 w-2/12 left-[74.5%] top-[18.5%]",
      "absolute z-10 w-3/12 left-[30%] top-[5%] -skew-y-3",

      "absolute z-10 w-5/12 left-[40%] top-[13%]",
      "absolute z-10 w-2/12 left-[48%] top-[24%]",
      "absolute z-10 w-4/12 left-[13%] top-[11%]",
    ],
  },
  {
    ratio: "2/3",
    positions: [
      "absolute z-10 h-full w-auto left-[20%] ",
      "absolute z-10 w-2/12 left-[74.5%] top-[16%]",
      "absolute z-10 w-3/12 left-[30%] top-[5%] -skew-y-3",

      "absolute z-10 w-4/12 left-[40%] top-[13%]",
      "absolute z-10 w-2/12 left-[48%] top-[20%]",
      "absolute z-10 w-3/12 left-[13%] top-[9%]",
    ],
  },
  {
    ratio: "4/7",
    positions: [
      "absolute z-10 h-full w-auto left-[26%] rounded-md",
      "absolute z-10 w-1/12 left-[79%] top-[20%]",
      "absolute z-10 w-2/12 left-[35%] top-[10%] -skew-y-3",

      "absolute z-10 w-3/12 left-[40%] top-[13%]",
      "absolute z-10 w-2/12 left-[48%] top-[15%]",
      "absolute z-10 w-3/12 left-[13%] top-[9%]",
    ],
  },
  {
    ratio: "5/4",
    positions: [
      "absolute z-10 w-full h-auto top-[5%] rounded-md",
      "absolute z-10 w-2/12 left-[74.5%] top-[22%]",
      "absolute z-10 w-4/12 left-[30%] top-[10%] -skew-y-3",

      "absolute z-10 w-5/12 left-[40%] top-[13%]",
      "absolute z-10 w-2/12 left-[48%] top-[27%]",
      "absolute z-10 w-5/12 left-[3%] top-[9%]",
    ],
  },

  {
    ratio: "3/2",
    positions: [
      "absolute z-10 w-full h-auto top-[12%] rounded-md",
      "absolute z-10 w-2/12 left-[74.5%] top-[23%]",
      "absolute z-10 w-4/12 left-[30%] top-[15%] -skew-y-3",

      "absolute z-10 w-6/12 left-[35%] top-[15%]",
      "absolute z-10 w-3/12 left-[40%] top-[27%]",
      "absolute z-10 w-5/12 left-[3%] top-[20%]",
    ],
  },

  {
    ratio: "7/4",
    positions: [
      "absolute z-10 w-full h-auto top-[18%] rounded-md",
      "absolute z-10 w-2/12 left-[74.5%] top-[24%]",
      "absolute z-10 w-5/12 left-[28%] top-[10%] -skew-y-3",

      "absolute z-10 w-7/12 left-[30%] top-[20%]",
      "absolute z-10 w-3/12 left-[40%] top-[27%]",
      "absolute z-10 w-5/12 left-[3%] top-[20%]",
    ],
  },
];

const frameData = [
  {
    index: 0,
    src: "",
    alt: "White wall with a poster",
  },
  {
    index: 1,

    src: "/images/backgrounds/sliderBackground6.jpg",
    alt: "White wall with a poster",
  },
  {
    index: 2,
    src: "/images/backgrounds/sliderBackground5.jpg",
    alt: "White wall with a poster",
  },
  {
    index: 3,
    src: "/images/backgrounds/sliderBackground4.jpg",
    alt: "White wall with a poster",
  },
  {
    index: 4,
    src: "/images/backgrounds/sliderBackground3.jpg",
    alt: "White wall with a poster",
  },
  {
    index: 5,
    src: "/images/backgrounds/sliderBackground2.jpg",
    alt: "White wall with a poster",
  },
];

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
            className="h-[600px]"
          >
            {frameData.map((frame) => (
              <SwiperSlide key={frame.src}>
                {frame.src && (
                  <Image
                    alt={frame.alt}
                    src={frame.src}
                    width={width ?? "1280"} //images must be imported in 1280x1280 to correctly fit
                    height={height ?? "1280"}
                    quality="80"
                    className=""
                  />
                )}
                <Image
                  alt={prompt}
                  src={image}
                  height="400"
                  width="400"
                  className={`${position} transition-all duration-300`}
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
                className={`${positions[frame.index]} `}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
