"use client";

import React from "react";

import "react-medium-image-zoom/dist/styles.css";

import { useMessageStore } from "../../store/messageStore";
import Slider from "../slider/slider";
import ImageContainerNoPoster from "./image-container-no-poster";

type ImageContainerProps = {};

const ImageContainer = ({}: ImageContainerProps) => {
  const [messages] = useMessageStore((state) => [state.messages]);

  const hasImage = messages.length > 0;

  return (
    <>
      {hasImage ? (
        <Slider />
      ) : (
        <ImageContainerNoPoster className="mx-auto h-[400px] lg:h-[500px]" />
      )}
    </>
  );
};

export default ImageContainer;
