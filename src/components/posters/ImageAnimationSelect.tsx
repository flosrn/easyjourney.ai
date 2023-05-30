"use client";

import React from "react";
import Image from "next/image";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { motion } from "framer-motion";

import { cn } from "~/lib/classNames";

type ImageAnimationSelectProps = {
  id: string;
  prompt: string;
  image: string;
  width?: number;
  height?: number;
};

const ImageAnimationSelect = ({
  id,
  prompt,
  image,
  width,
  height,
}: ImageAnimationSelectProps) => {
  const selectedPosters = useSelectPosterStore(
    (state) => state.selectedPosters
  );
  const isSelected = selectedPosters.find(
    (selectedPoster) => id === selectedPoster
  );

  return (
    <div
      className={cn("bg-muted rounded-lg", {
        "border-2 border-highlight": isSelected,
      })}
    >
      <motion.div
        layout
        animate={{ padding: isSelected ? "11%" : "0" }}
        transition={{ duration: 0.4 }}
      >
        <Image
          alt={prompt}
          src={image}
          width={width ?? 500}
          height={height ?? 500}
          className={cn("rounded-lg")}
        />
      </motion.div>
    </div>
  );
};

export default ImageAnimationSelect;
