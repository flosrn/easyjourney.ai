import React from "react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import type { CartEntry } from "use-shopping-cart/core";

export type CartItemProps = {
  item: CartEntry & {
    product_data?: {
      prompt?: string;
      image?: string;
    };
  };
};

const CartItem = ({ item }: CartItemProps) => {
  const { id, name, image, quantity, formattedValue } = item;
  const { incrementItem, decrementItem } = useShoppingCart();
  return (
    <>
      {image && (
        <Image
          alt={name}
          src={image}
          width="80"
          height="80"
          quality="10"
          className="mr-4 rounded object-cover"
        />
      )}
      <div className="flex w-full flex-col">
        <div>
          <h3 className="truncate text-lg font-semibold text-gray-800">
            {name}
          </h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <button
              onClick={() => decrementItem(id)}
              className="mr-2 rounded bg-gray-200 px-2 py-1 text-gray-700"
            >
              -
            </button>
            <span className="text-gray-700">{quantity}</span>
            <button
              onClick={() => incrementItem(id)}
              className="ml-2 rounded bg-gray-200 px-2 py-1 text-gray-700"
            >
              +
            </button>
          </div>
          <span className="ml-2 text-gray-700">{formattedValue}</span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
