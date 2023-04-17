import {
  A11y,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import React, { useState } from "react";
import Image from "next/image";

const frameData = [
  {
    index: 0,
    src: "/images/backgrounds/sliderBackground1.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-9/12 left-[13%] top-[13%]",
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
    position: "absolute z-10 w-4/12 left-[30%] top-[5%]  -skew-y-3",
  },
  {
    index: 5,
    src: "/images/backgrounds/sliderBackground6.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-2/12 left-[74.5%] top-[18.5%]",
  },
];

export default function Slider({
  prompt,
  image,
}: {
  prompt: string;
  image: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            slidesPerView={1}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
            navigation
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {frameData.map((frame) => (
              <SwiperSlide key={frame.src}>
                <Image
                  alt={frame.alt}
                  src={frame.src}
                  width="1280" //images must be imported in 1280x1280 to correctly fit
                  height="1280"
                  quality="80"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Image
            alt={prompt}
            src={image}
            height="400"
            width="400"
            className={`${frameData[activeIndex].position} transition-all duration-300`}
          />
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          slidesPerView={4.5}
          mousewheel={true}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="mySwiper mt-4"
        >
          {frameData.map((frame) => (
            <SwiperSlide
              key={frame.index}
              position="relative"
              className={`overflow-hidden rounded-md ${
                activeIndex === frame.index
                  ? "border-2 border-solid border-blue-500"
                  : ""
              } `}
            >
              <Image
                alt={frame.alt}
                src={frame.src}
                width="1280"
                height="1280"
                quality="80"
              />
              <Image
                alt={prompt}
                src={image}
                height="400"
                width="400"
                className={frame.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
