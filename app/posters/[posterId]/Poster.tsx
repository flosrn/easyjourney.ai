"use client";

import React from "react";
import useCartStore from "~/store/useCartStore";

type PosterProps = {
  id: string;
  title: string;
  prompt: string;
  image: string;
};

const Poster = ({ id, title, prompt, image }: PosterProps) => {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <>
      <div className="">
        <img
          src={`data:image/png;base64,${image}`}
          alt={title}
          className="w-full object-cover"
        />
      </div>
      <div className="">
        <p className="mb-4 text-gray-600">{prompt}</p>
        <h2 className="mb-4 text-2xl font-semibold">45 €</h2>
        <button
          onClick={() => addItem({ id, prompt, image, quantity: 1 })}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Ajouter au panier
        </button>
      </div>
    </>
  );
};

export default Poster;
