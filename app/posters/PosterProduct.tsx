// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
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
import { useShoppingCart } from "use-shopping-cart";

import type { PosterType } from "~/types/poster";

export type PosterProductProps = PosterType;

const fetchProduct = async () => {
  const response = await fetch(`/api/products`, {
    method: "GET",
  });
  return response.json();
};

const deletePoster = async (posterId: string) => {
  const response = await fetch(`/api/posters/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ posterId }),
  });
  return response.json();
};

const PosterProduct = ({ id, prompt, image, user }: PosterProductProps) => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFrame, setSelectedFrame] = useState<{
    material: string;
    color: string;
  }>({
    material: "Wood",
    color: "White",
  });
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const { addItem } = useShoppingCart();
  const { data } = useSession();
  const router = useRouter();
  const isAdmin = data?.user.role === "ADMIN";
  const isPosterOwner = data?.user.id && user?.id && data.user.id === user.id;

  const { data: productData } = useQuery(["product"], async () =>
    fetchProduct()
  );

  useQuery(["delete"], async () => deletePoster(id), {
    enabled: isDeleteButtonClicked,
    onSuccess: () => {
      toast.success("Poster supprimé avec succès.");
      setTimeout(() => {
        router.back();
      }, 1000);
    },
    onError: () => {
      toast.error(
        "Une erreur s'est produite lors de la suppression du poster."
      );
    },
  });

  const { product, prices, defaultPrice } = productData || {};

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleFrameChange = (event) => {
    const [material, color] = event.target.value.split("-");
    setSelectedFrame({ material, color });
  };

  const updateSelectedPrice = (
    size: string,
    frame: { material: string; color: string }
  ) => {
    const matchingPrice = prices?.find(
      (price) =>
        price.metadata.size === size &&
        price.metadata.frame_material === frame.material &&
        price.metadata.frame_color === frame.color
    );

    if (matchingPrice) {
      setSelectedPrice(matchingPrice);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "Aucune correspondance de prix trouvée pour la taille et le cadre sélectionnés."
      );
    }
  };

  useEffect(() => {
    if (defaultPrice) {
      setSelectedPrice(defaultPrice);
    }
    if (selectedSize && selectedFrame.material && selectedFrame.color) {
      updateSelectedPrice(selectedSize, selectedFrame);
    }
  }, [selectedSize, selectedFrame, defaultPrice]);

  const sizes = prices?.reduce((acc, price) => {
    if (!acc.includes(price.metadata.size)) {
      acc.push(price.metadata.size);
    }
    return acc;
  }, []);

  const frames = prices?.reduce((acc, price) => {
    const uniqueFrame = {
      material: price.metadata.frame_material,
      color: price.metadata.frame_color,
    };
    const frameExists = acc.some(
      (existingFrame) =>
        existingFrame.material === uniqueFrame.material &&
        existingFrame.color === uniqueFrame.color
    );

    if (!frameExists) {
      acc.push(uniqueFrame);
    }
    return acc;
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/*<div className="">*/}
      {/*  <Image alt={prompt} src={image} width="400" height="300" quality="80" />*/}
      {/*</div>*/}
      <div className="">
        {/*  <p className="mb-4 text-gray-600">{prompt}</p>*/}
        {/*  <div className="flex justify-between">*/}
        {/*    <div>*/}
        {/*      <select*/}
        {/*        value={selectedSize}*/}
        {/*        onChange={handleSizeChange}*/}
        {/*        className="mb-4 mr-2"*/}
        {/*      >*/}
        {/*        <option value="">Sélectionnez la taille</option>*/}
        {/*        {sizes?.map((size) => (*/}
        {/*          <option key={size} value={size}>*/}
        {/*            {size}*/}
        {/*          </option>*/}
        {/*        ))}*/}
        {/*      </select>*/}
        {/*      <select*/}
        {/*        value={`${selectedFrame.material}-${selectedFrame.color}`}*/}
        {/*        onChange={handleFrameChange}*/}
        {/*        className="mb-4"*/}
        {/*      >*/}
        {/*        <option value="">Sélectionnez le cadre</option>*/}
        {/*        {frames?.map((frame) => (*/}
        {/*          <option*/}
        {/*            key={`${frame.material}-${frame.color}`}*/}
        {/*            value={`${frame.material}-${frame.color}`}*/}
        {/*          >*/}
        {/*            {frame.material} - {frame.color}*/}
        {/*          </option>*/}
        {/*        ))}*/}
        {/*      </select>*/}
        {/*    </div>*/}
        {/*    {}*/}
        {/*    /!* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition *!/*/}
        {/*    {selectedPrice && (*/}
        {/*      <h2 className="mb-4 text-2xl font-semibold">*/}
        {/*        {selectedPrice.unit_amount / 100}{" "}*/}
        {/*        {selectedPrice.currency.toUpperCase()}*/}
        {/*      </h2>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*  <button*/}
        {/*    onClick={() =>*/}
        {/*      addItem({*/}
        {/*        id: `${selectedPrice.id}-${id}`,*/}
        {/*        name: `Poster (taille: ${selectedSize} - ${selectedFrame.material} - ${selectedFrame.color})`,*/}
        {/*        price: selectedPrice.unit_amount,*/}
        {/*        currency: selectedPrice.currency,*/}
        {/*        image,*/}
        {/*        product_data: {*/}
        {/*          id: product.id,*/}
        {/*          description: prompt,*/}
        {/*          metadata: {*/}
        {/*            size: selectedSize,*/}
        {/*            frame_material: selectedFrame.material,*/}
        {/*            frame_color: selectedFrame.color,*/}
        {/*          },*/}
        {/*        },*/}
        {/*        price_data: {*/}
        {/*          size: selectedSize,*/}
        {/*          frame: selectedFrame,*/}
        {/*        },*/}
        {/*      })*/}
        {/*    }*/}
        {/*    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"*/}
        {/*    disabled={!selectedPrice}*/}
        {/*  >*/}
        {/*    Ajouter au panier*/}
        {/*  </button>*/}
        {/*  {(isPosterOwner || isAdmin) && (*/}
        {/*    <button*/}
        {/*      onClick={() => setIsDeleteButtonClicked(true)}*/}
        {/*      className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md hover:bg-red-600"*/}
        {/*    >*/}
        {/*      Supprimer*/}
        {/*    </button>*/}
        {/*  )}*/}
      </div>
      <div className="flex w-3/5 h-96">
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
      </div>

      <Toaster position="bottom right" />
    </>
  );
};

export default PosterProduct;
