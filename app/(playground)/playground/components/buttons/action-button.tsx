"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import wait from "~/utils/wait";
import type { LucideIcon } from "lucide-react";
import { Loader2Icon } from "lucide-react";
import type { GenerationType, MJMessage } from "midjourney";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import type { ButtonVariant } from "~/components/ui/button";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

import { useMessageStore } from "../../store/messageStore";
import { useMidjourneyStore } from "../../store/midjourneyStore";
import { useTutorialStore } from "../../store/tutorialStore";

type ActionButtonProps = {
  id: string;
  type?: GenerationType;
  label: string;
  showLabelOnMobile?: boolean;
  variant?: ButtonVariant;
  Icon: LucideIcon;
  isDisabled?: boolean;
  tourAction?: "moveNext" | "destroy";
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
  tourAction,
  clickHandler,
  dataOption,
  dataOptionValue,
  className,
}: ActionButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();
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
  const [driverJs] = useTutorialStore((state) => [state.driverJs]);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isImagineButton = type === "imagine";
    const isUpscaleButton = type === "upscale";
    const isVariationButton = type === "variation";
    const noSelectedImage = selectedImage === null;
    if (isImagineButton && !session?.user) {
      toast.error("Please login first.");
      await wait(2000);
      router.push(`/api/auth/signin?callbackUrl=/playground`);
    }

    const currentMessage = messages[currentMessageIndex] as
      | MJMessage
      | undefined;
    const currentGenerationType = currentMessage?.generationType;
    console.log("currentGenerationType :", currentGenerationType);
    console.log("type :", type);
    const isImagine = currentGenerationType === "imagine";
    const isVariation = currentGenerationType === "variation";
    const isZoomOut = currentGenerationType === "zoomOut";
    const isVary = currentGenerationType === "vary";
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
    if (tourAction === "moveNext") {
      driverJs?.moveNext();
    } else if (tourAction === "destroy") {
      driverJs?.destroy();
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
