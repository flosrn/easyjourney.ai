"use client";

import React from "react";
import { motion } from "framer-motion";

import { Textarea } from "~/components/ui/textarea";

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

  const handlePromptValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;

    const aspectRatioPattern = /--ar\s+(\d{1,2}:\d{1,2})\b/;
    const aspectRatioMatch = inputValue.match(aspectRatioPattern);

    const versionPattern = /--v\s+(4|5(\.1)?)\b/;
    const versionMatch = inputValue.match(versionPattern);

    const nijiPattern = /--niji\b/;
    const nijiMatch = inputValue.match(nijiPattern);

    const qualityPattern = /--quality\s+(1|\.5|\.25)\b/;
    const qualityMatch = inputValue.match(qualityPattern);

    const chaosPattern = /--c\s+(100|[1-9]\d?|0)\b/;
    const chaosMatch = inputValue.match(chaosPattern);

    const stylizePattern = /--stylize\s+([1-9]\d{0,2}|1000|0)\b/;
    const stylizeMatch = inputValue.match(stylizePattern);

    const stopPattern = /--stop\s+(100|[1-9]0)\b/;
    const stopMatch = inputValue.match(stopPattern);

    const seedPattern = /-{2}se{2}d\s+([1-9]\d{0,8}|10{9})\b/;
    const seedMatch = inputValue.match(seedPattern);

    const tilePattern = /--tile\b/;
    const tileMatch = inputValue.match(tilePattern);

    if (aspectRatioMatch?.[1]) {
      const aspectRatioValue = aspectRatioMatch[1];
      console.log(aspectRatioValue);
    }

    if (versionMatch?.[1] || nijiMatch) {
      const versionValue = nijiMatch ? "niji" : versionMatch?.[1];
      console.log(versionValue);
    }

    if (qualityMatch?.[1]) {
      const qualityValue = qualityMatch[1];
      console.log(qualityValue);
    }

    if (chaosMatch?.[1]) {
      const chaosValue = chaosMatch[1];
      console.log(chaosValue);
    }

    if (stylizeMatch?.[1]) {
      const stylizenValue = stylizeMatch[1];
      console.log(stylizenValue);
    }

    if (stopMatch?.[1]) {
      const stopValue = stopMatch[1];
      console.log(stopValue);
    }

    if (seedMatch?.[1]) {
      const seedValue = seedMatch[1];
      console.log(seedValue);
    }

    if (tileMatch) {
      const tileValue = true;
      console.log(tileValue);
    }

    setPromptValue(inputValue);
  };

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
        onChange={handlePromptValue}
        onKeyDown={handleKeyDown}
        placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
        className={cn("my-5", collapse ? "h-16" : "h-24")}
      />
    </motion.div>
  );
};

export default TextareaPrompt;
