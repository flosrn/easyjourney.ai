import React from "react";
import useCartStore, { type CartItemType } from "~/store/useCartStore";

const CartItem = ({ id, prompt, image, quantity }: CartItemType) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <>
      <img
        src={`data:image/png;base64,${image}`}
        alt={prompt}
        className="mr-4 h-20 w-20 rounded object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="truncate text-lg font-semibold text-gray-800">
            {prompt}
          </h3>
        </div>
        <div className="mt-2 flex items-center">
          <button
            onClick={() => removeItem({ id, prompt, image, quantity })}
            className="mr-2 rounded bg-gray-200 px-2 py-1 text-gray-700"
          >
            -
          </button>
          <span className="text-gray-700">{quantity}</span>
          <button
            onClick={() => addItem({ id, prompt, image, quantity })}
            className="ml-2 rounded bg-gray-200 px-2 py-1 text-gray-700"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
