"use client";

import React from "react";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type CopyButtonProps = {
  text: string;
};

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard");
  };

  return (
    <TooltipButton Icon={CopyIcon} clickHandler={handleDownload}>
      Copy prompt
    </TooltipButton>
  );
};

export default CopyButton;
