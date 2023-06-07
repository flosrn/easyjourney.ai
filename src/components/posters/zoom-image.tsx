"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

type ZoomImageProps = {
  imageUrl: string;
  alt: string;
};

const ZoomImage = ({ imageUrl, alt }: ZoomImageProps) => (
  <div className="absolute left-0 top-0">
    <Zoom zoomMargin={30}>
      <img src={imageUrl} alt={alt} />
    </Zoom>
  </div>
);

export default ZoomImage;
