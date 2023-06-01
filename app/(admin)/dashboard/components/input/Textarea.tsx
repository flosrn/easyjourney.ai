"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/Button";
import { Textarea as TextareaInput } from "~/components/ui/Textarea";

import { cn } from "~/lib/classNames";

import { useInputStore } from "../../store/inputStore";

type TextareaProps = {};

type Image = {
  id: string;
  imageUrl: string;
  command: string;
  prompt: string;
  jobId: string;
};

const TextareaPrompt = ({}: TextareaProps) => {
  const [inputValue, setInputValue] = useInputStore((state) => [
    state.inputValue,
    state.setInputValue,
  ]);
  const [images, setImages] = useState<Image[]>([]);

  const searchMidjourneyResults = async () => {
    const response = await fetch("/api/admin/midjourney/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue }),
    });
    const data = await response.json();
    console.log("data :", data);
    if (data) {
      setImages(data);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.length > 0) {
        await searchMidjourneyResults();
      }
    }
  };

  return (
    <div className="">
      <div className="mb-5 font-bold">Search for midjourney results</div>
      <div className="flex items-end space-x-5">
        <div className="flex w-full">
          <TextareaInput
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tropical rainforest, gloomy, wet after rain, peaceful place 8k, hyper realistic"
            className={cn("h-[110px]")}
          />
        </div>
        <div className="flex">
          <Button onClick={searchMidjourneyResults}>
            <span className="hidden md:block">Search</span>
          </Button>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {images.length > 0 &&
          images.map((image) => (
            <div key={image.id} className="">
              <img src={image.imageUrl} alt="" width={150} height={150} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TextareaPrompt;
