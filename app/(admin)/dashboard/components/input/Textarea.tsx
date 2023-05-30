"use client";

import React from "react";
import { motion } from "framer-motion";
import { RedoIcon, Trash2Icon, UndoIcon } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Textarea as TextareaInput } from "~/components/ui/Textarea";

import { cn } from "~/lib/classNames";

import { useInputStore } from "../../store/inputStore";

type TextareaProps = {};

const TextareaPrompt = ({}: TextareaProps) => {
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
    <div className="">
      <div className="ml-auto flex space-x-2">
        <>
          <Button
            // onClick={handlePreviousImage}
            // disabled={isLoading || isFirst}
            variant="outline"
          >
            <UndoIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Undo</span>
          </Button>
          <Button
            // onClick={handleNextImage}
            // disabled={isLoading || isLast || !hasImages}
            variant="outline"
          >
            <RedoIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Redo</span>
          </Button>
          <Button
            // onClick={handleClear}
            variant="secondary"
            // disabled={isEmpty}
          >
            <Trash2Icon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">Clear</span>
          </Button>
        </>
        <Button
        // onClick={async () => generateImage(prompt)}
        // disabled={isLoading}
        >
          {/*{isGenerationLoading ? (*/}
          {/*  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />*/}
          {/*) : (*/}
          {/*  <BrushIcon className="h-4 w-4 md:mr-2" />*/}
          {/*)}*/}
          <span className="hidden md:block">Generate</span>
        </Button>
      </div>
      <motion.div layout>
        <TextareaInput
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
          className={cn("my-5 h-[110px]")}
        />
      </motion.div>
    </div>
  );
};

export default TextareaPrompt;
