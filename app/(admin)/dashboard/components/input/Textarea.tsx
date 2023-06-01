"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

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

const fetchMidjourneyResults = async (value: string) => {
  const response = await fetch("/api/admin/midjourney/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });
  const data = await response.json();
  return data;
};

const TextareaPrompt = ({}: TextareaProps) => {
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const [inputValue, setInputValue] = useInputStore((state) => [
    state.inputValue,
    state.setInputValue,
  ]);

  const { data: images, isFetching } = useQuery<Image[]>({
    queryKey: ["images", inputValue],
    queryFn: async () => fetchMidjourneyResults(inputValue),
    enabled: startSearch,
  });

  console.log("images :", images);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.length > 0) {
        setStartSearch(true);
      }
    }
  };

  const columns: Image[][] = [[], [], [], []];

  images?.map((poster, index) => {
    columns[index % 4].push(poster);
  });

  return (
    <div className="">
      <div className="mb-5 font-bold">Search for midjourney results</div>
      <div className="flex items-end space-x-5">
        <div className="flex w-full">
          <TextareaInput
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="leave blank to search for all midjourney results or enter a specific midjourney prompt"
            className={cn("h-[110px]")}
          />
        </div>
        <div className="flex">
          <Button onClick={() => setStartSearch(true)}>
            {isFetching && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="hidden md:block">Search</span>
          </Button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images &&
          images.length > 0 &&
          columns.map((column, index) => (
            <div className="grid h-fit gap-3" key={index}>
              {column.map((image) => (
                <React.Fragment key={image.id}>
                  <img src={image.imageUrl} alt="" width={500} height={500} />
                </React.Fragment>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TextareaPrompt;
