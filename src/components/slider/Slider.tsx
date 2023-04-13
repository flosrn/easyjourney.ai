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

export default function Slider({ prompt, image }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className="w-1/3">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={3}
          direction="vertical"
          mousewheel={true}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
          className="h-full mySwiper"
        >
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="130"
              height="121"
              objectFit="contain"
              className="h-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="130"
              height="121"
              className="h-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="130"
              height="121"
              className="h-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="130"
              height="121"
              objectFit="contain"
              className="h-full mx-auto"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="218"
              height="121"
              quality="80"
              className="h-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="218"
              height="121"
              quality="80"
              className="h-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
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
          direction="vertical"
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="h-full"
        >
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="400"
              height="300"
              quality="80"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={prompt}
              src={image}
              width="400"
              height="300"
              quality="80"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
