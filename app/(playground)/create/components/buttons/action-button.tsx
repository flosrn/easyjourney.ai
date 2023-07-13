"use client";

import React, { useState } from "react";
import type { LucideProps } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import type { GenerationType } from "midjourney";
import { toast } from "react-hot-toast";

import type { ButtonVariant } from "~/components/ui/button";
import { Button } from "~/components/ui/button";

import { useMidjourneyStore } from "../../store/midjourneyStore";

type ActionButtonProps = {
  type?: GenerationType;
  label: string;
  variant?: ButtonVariant;
  Icon: React.ComponentType<LucideProps>;
  isDisabled?: boolean;
  clickHandler: (option?: string) => void;
  dataOption?: string;
};

const ActionButton = ({
  type,
  label,
  variant,
  Icon,
  isDisabled,
  clickHandler,
  dataOption,
}: ActionButtonProps) => {
  const [option, setOption] = useState<string>("");
  const [
    generationType,
    { isLoading },
    setGenerationType,
    setMsg,
    selectedImage,
  ] = useMidjourneyStore((state) => [
    state.generationType,
    state.requestState,
    state.setGenerationType,
    state.setMsg,
    state.selectedImage,
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("generationType :", generationType);
    const isImagine = generationType === "imagine";
    const isVariation = generationType === "variation";
    const isVary = generationType === "vary";
    const isZoomOut = generationType === "zoomOut";
    const noSelectedImage = selectedImage === null;
    const showWarning =
      (isImagine || isVariation || isVary || isZoomOut) && noSelectedImage;
    if (showWarning) {
      toast.error("Please select an image first.");
      return;
    }
    const currentOption = event.currentTarget.dataset.option;
    currentOption && setOption(currentOption);
    setGenerationType(type);
    clickHandler(currentOption);
    switch (type) {
      case "save": {
        setMsg("Saving...");
        break;
      }
      case "upscale": {
        setMsg("Upscaling...");
        break;
      }
      case "imagine": {
        setMsg("Generating...");
        break;
      }
      default: {
        setMsg("Generating...");
      }
    }
  };

  const isButtonLoading =
    isLoading &&
    generationType === type &&
    (option === dataOption || !dataOption);

  return (
    <Button
      data-option={dataOption}
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {isButtonLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {dataOption && <span className="ml-2 block md:hidden">{dataOption}</span>}
      <span className="ml-2 hidden md:block">{label}</span>
    </Button>
  );
};

export default ActionButton;
