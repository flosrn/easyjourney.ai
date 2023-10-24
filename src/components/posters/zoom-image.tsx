"use client";

import React, { useCallback } from "react";
import { useZoomStore } from "~/store/zoomStore";
import { ErrorBoundary } from "react-error-boundary";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

type ZoomImageProps = {
  imageUrl: string;
  alt: string;
};

const ZoomImage = ({ imageUrl, alt }: ZoomImageProps) => {
  const [isZoomOpen, setIsZoomed] = useZoomStore((state) => [
    state.isZoomOpen,
    state.setIsZoomed,
  ]);

  const handleZoomChange = useCallback(
    (shouldZoom: boolean) => {
      setIsZoomed(shouldZoom);
    },
    [setIsZoomed]
  );

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => {
        resetErrorBoundary();
        return null;
      }}
    >
      <div className="absolute left-0 top-0">
        <ControlledZoom
          isZoomed={isZoomOpen}
          onZoomChange={handleZoomChange}
          zoomMargin={30}
        >
          <img src={imageUrl} alt={alt} />
        </ControlledZoom>
      </div>
    </ErrorBoundary>
  );
};

export default ZoomImage;
