"use client";

import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import type { GenerationType, MJMessage } from "midjourney";
import { toast } from "react-hot-toast";

import type { ButtonVariant } from "~/components/ui/button";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";

type ActionButtonProps = {
  id: string;
  type?: GenerationType;
  label: string;
  showLabelOnMobile?: boolean;
  variant?: ButtonVariant;
  Icon: LucideIcon;
  isDisabled?: boolean;
  clickHandler: (option?: string, newPrompt?: string) => void;
  dataOption?: string;
  dataOptionValue?: string;
  className?: string;
};

const ActionButton = ({
  id,
  type,
  label,
  showLabelOnMobile = true,
  variant = "outline",
  Icon,
  isDisabled,
  clickHandler,
  dataOption,
  dataOptionValue,
  className,
}: ActionButtonProps) => {
  const [option, setOption] = useState<string>("");
  const [messages, currentMessageIndex, setCurrentMessageIndex] =
    useMessageStore((state) => [
      state.messages,
      state.currentMessageIndex,
      state.setCurrentMessageIndex,
    ]);
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
    const currentMessage = messages[currentMessageIndex] as
      | MJMessage
      | undefined;
    const currentGenerationType = currentMessage?.generationType;
    console.log("currentGenerationType :", currentGenerationType);
    console.log("type :", type);
    const isImagine = currentGenerationType === "imagine";
    const isVariation = currentGenerationType === "variation";
    const isVary = currentGenerationType === "vary";
    const isZoomOut = currentGenerationType === "zoomOut";
    const isUpscaleButton = type === "upscale";
    const isVariationButton = type === "variation";
    const noSelectedImage = selectedImage === null;
    const showWarning =
      (isImagine || isVariation || isVary || isZoomOut) && noSelectedImage;
    if (showWarning && type && (isUpscaleButton || isVariationButton)) {
      toast.error("Please select an image first.");
      return;
    }
    const currentOption = event.currentTarget.dataset.option;
    const currentOptionValue = event.currentTarget.dataset.optionValue;
    console.log("currentOptionValue :", currentOptionValue);
    currentOption && setOption(currentOption);
    setGenerationType(type);
    clickHandler(currentOption, currentOptionValue);
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
        setMsg("Waiting to start...");
        break;
      }
      default: {
        setMsg("Waiting to start...");
      }
    }
  };

  const isButtonLoading =
    isLoading &&
    generationType === type &&
    (option === dataOption || !dataOption);

  return (
    <Button
      id={id}
      data-option={dataOption}
      data-option-value={dataOptionValue}
      variant={variant}
      onClick={handleClick}
      disabled={isDisabled}
      className={className}
    >
      {isButtonLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {dataOption && !showLabelOnMobile && (
        <span className="ml-2 block md:hidden">{dataOption}</span>
      )}
      <span
        className={cn("ml-2", {
          "hidden md:block": !showLabelOnMobile,
        })}
      >
        {label}
      </span>
    </Button>
  );
};

export default ActionButton;
