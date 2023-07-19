"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EditIcon } from "lucide-react";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

import { usePromptStore } from "../../../../app/(playground)/playground/store/promptStore";

type EditPromptButtonProps = {
  prompt: string;
};

const EditPromptButton = ({ prompt }: EditPromptButtonProps) => {
  const setPromptValue = usePromptStore((state) => state.setPromptValue);
  const router = useRouter();

  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPromptValue(prompt);
    router.push("/playground");
  };

  return (
    <TooltipButton
      Icon={EditIcon}
      iconSize="xs"
      clickHandler={handleDownload}
      className="w-fit"
    >
      Edit prompt
    </TooltipButton>
  );
};

export default EditPromptButton;
