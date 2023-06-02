"use client";

import React from "react";
import { motion } from "framer-motion";

import { Textarea } from "~/components/ui/Textarea";

import { cn } from "~/lib/classNames";

import { useImageGenerationStore } from "../../store/imageGenerationStore";
import { usePromptStore } from "../../store/promptStore";

type TextareaPromptProps = {
  collapse?: boolean;
};

const TextareaPrompt = ({ collapse }: TextareaPromptProps) => {
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
    <motion.div layout>
      <Textarea
        value={promptValue}
        onChange={(event) => setPromptValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
        className={cn("my-5", collapse ? "h-16" : "h-24")}
      />
    </motion.div>
  );
};

export default TextareaPrompt;
