// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useShoppingCart } from "use-shopping-cart";

export type PosterProps = {
  id: string;
  prompt: string;
  image: string;
};

const fetchProduct = async () => {
  const response = await fetch(`/api/products`, {
    method: "GET",
  });
  return response.json();
};

const Poster = ({ id, title, prompt, image }: PosterProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFrame, setSelectedFrame] = useState<{
    material: string;
    color: string;
  }>({
    material: "Wood",
    color: "White",
  });
  const { addItem } = useShoppingCart();

  const { data: productData } = useQuery(["product"], async () =>
    fetchProduct()
  );

  const { product, prices, defaultPrice } = productData || {};

  const [selectedPrice, setSelectedPrice] = useState(null);

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

  return (
    <>
      <div className="">
        <Image alt={title} src={image} width="400" height="300" quality="80" />
      </div>
      <div className="">
        <p className="mb-4 text-gray-600">{prompt}</p>
        <div className="flex justify-between">
          <div>
            <select
              value={selectedSize}
              onChange={handleSizeChange}
              className="mb-4 mr-2"
            >
              <option value="">Sélectionnez la taille</option>
              {sizes?.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <select
              value={`${selectedFrame.material}-${selectedFrame.color}`}
              onChange={handleFrameChange}
              className="mb-4"
            >
              <option value="">Sélectionnez le cadre</option>
              {frames?.map((frame) => (
                <option
                  key={`${frame.material}-${frame.color}`}
                  value={`${frame.material}-${frame.color}`}
                >
                  {frame.material} - {frame.color}
                </option>
              ))}
            </select>
          </div>
          {}
          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
          {selectedPrice && (
            <h2 className="mb-4 text-2xl font-semibold">
              {selectedPrice.unit_amount / 100}{" "}
              {selectedPrice.currency.toUpperCase()}
            </h2>
          )}
        </div>
        <button
          onClick={() =>
            addItem({
              id: `${selectedPrice.id}-${id}`,
              name: `Poster (taille: ${selectedSize} - ${selectedFrame.material} - ${selectedFrame.color})`,
              price: selectedPrice.unit_amount,
              currency: selectedPrice.currency,
              image,
              product_data: {
                id: product.id,
                description: prompt,
                metadata: {
                  size: selectedSize,
                  frame_material: selectedFrame.material,
                  frame_color: selectedFrame.color,
                },
              },
              price_data: {
                size: selectedSize,
                frame: selectedFrame,
              },
            })
          }
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={!selectedPrice}
        >
          Ajouter au panier
        </button>
      </div>
    </>
  );
};

export default Poster;
