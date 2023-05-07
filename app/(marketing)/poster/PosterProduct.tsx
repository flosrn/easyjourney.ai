// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

import Slider from "~/components/slider/Slider";
import { Button } from "~/components/ui/Button";

import type { PosterType } from "~/types/poster";

import PosterDetails from "./PosterDetails";
import PosterOptions from "./PosterOptions";

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

const PosterProduct = ({
  id,
  prompt,
  image,
  width,
  height,
  ratio,
  user,
  createdAt,
}: PosterProductProps) => {
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

  return (
    <>
      <div className="md:flex">
        <div className="md:w-1/2">
          <Slider
            prompt={prompt}
            image={image}
            width={width}
            height={height}
            ratio={ratio}
            createdAt={createdAt}
          />
        </div>
        <div className="md:w-1/2">
          <div className="w-full md:ml-4">
            <PosterOptions prompt={prompt} user={user} addItem={addItem} />
          </div>
          <div>
            <PosterDetails prompt={prompt} ratio={ratio} />
            <div className="flex-center mt-8">
              <Button
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
                size={"lg"}
              >
                Ajouter au panier
              </Button>
              {(isAdmin || isPosterOwner) && (
                <Button
                  onClick={() => setIsDeleteButtonClicked(true)}
                  variant="outline"
                  size={"lg"}
                  className="ml-2"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom right" />
    </>
  );
};

export default PosterProduct;
