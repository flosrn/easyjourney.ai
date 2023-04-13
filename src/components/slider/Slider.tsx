import {
  A11y,
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/swiper.min.css";
import React, { useState } from "react";
import Image from "next/image";

const FrameData = [
  { src: "/sliderBackground1.jpg", alt: "White wall with a poster" },
  { src: "/sliderBackground2.jpg", alt: "White wall with a poster" },
  { src: "/sliderBackground3.jpg", alt: "White wall with a poster" },
  { src: "/sliderBackground4.jpg", alt: "White wall with a poster" },
];

export default function Slider({ prompt, image }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    console.log("activeIndex", activeIndex);
  };

  return (
    <>
      <div className="w-2/3">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onActiveIndexChange={(swiper) => handleSlideChange(swiper)}
        >
          {FrameData.map((frame) => (
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
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={5}
          mousewheel={true}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="mt-2 mySwiper"
        >
          {FrameData.map((frame) => (
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
      </div>
    </>
  );
}
