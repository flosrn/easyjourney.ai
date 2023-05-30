"use client";

import React from "react";
import { motion } from "framer-motion";

import { Textarea as TextareaInput } from "~/components/ui/Textarea";

import { cn } from "~/lib/classNames";

import { useInputStore } from "../../store/inputStore";

type TextareaProps = {
  collapse?: boolean;
};

const TextareaPrompt = ({ collapse }: TextareaProps) => {
  const [inputValue, setInputValue] = useInputStore((state) => [
    state.inputValue,
    state.setInputValue,
  ]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.length > 0) {
        console.log("inputValue", inputValue);
      }
    }
  };

  return (
    <motion.div layout>
      <TextareaInput
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
        className={cn("my-5", collapse ? "h-16" : "h-[110px]")}
      />
    </motion.div>
  );
};

export default TextareaPrompt;
