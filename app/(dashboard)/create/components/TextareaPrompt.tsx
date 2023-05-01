"use client";

import React from "react";

import { Textarea } from "~/components/ui/Textarea";

import { useImageGenerationStore } from "../store/imageGenerationStore";
import { usePromptStore } from "../store/promptStore";

type TextareaPromptProps = {};

const TextareaPrompt = ({}: TextareaPromptProps) => {
  const [promptValue, setPromptValue] = usePromptStore((state) => [
    state.promptValue,
    state.setPromptValue,
  ]);
  const generateImage = useImageGenerationStore((state) => state.generateImage);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (promptValue.length > 0) {
        await generateImage(promptValue);
      }
    }
  };

  return (
    <Textarea
      value={promptValue}
      onChange={(event) => setPromptValue(event.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
      className="my-5"
    />
  );
};

export default TextareaPrompt;
