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
    position: "absolute z-10 w-4/12 left-[30%] top-[5%] transform",
  },
  {
    index: 5,
    src: "/images/backgrounds/sliderBackground6.jpg",
    alt: "White wall with a poster",
    position: "absolute z-10 w-2/12 left-[74%] top-[17%]",
  },
];

export default function Slider({ prompt, image }) {
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
            spaceBetween={0}
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
                  width="1280"
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
            className={`${
              activeIndex === 0
                ? frameData[0].position
                : activeIndex === 1
                ? frameData[1].position
                : activeIndex === 2
                ? frameData[2].position
                : activeIndex === 3
                ? frameData[3].position
                : activeIndex === 4
                ? frameData[4].position
                : activeIndex === 5
                ? frameData[5].position
                : frameData[0].position
            } transition-all duration-300`}
          />
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          slidesPerView={5}
          mousewheel={true}
          freeMode={true}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="mt-4 mySwiper"
        >
          {frameData.map((frame) => (
            <SwiperSlide key={frame.src} position="relative">
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
