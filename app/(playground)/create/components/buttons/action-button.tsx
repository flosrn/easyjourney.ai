"use client";

import React from "react";
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
  clickHandler: () => void;
};

const ActionButton = ({
  type,
  label,
  variant,
  Icon,
  isDisabled,
  clickHandler,
}: ActionButtonProps) => {
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

  const handleClick = () => {
    if (type === "imagine" && selectedImage === null) {
      toast.error("Please select an image first.");
      return;
    }
    setGenerationType(type);
    clickHandler();
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

  const isButtonLoading = isLoading && generationType === type;

  return (
    <Button variant={variant} onClick={handleClick} disabled={isDisabled}>
      {isButtonLoading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4 md:mr-2" />
      )}
      <span className="hidden md:block">{label}</span>
    </Button>
  );
};

export default ActionButton;
