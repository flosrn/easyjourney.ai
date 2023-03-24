"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Button, buttonVariants } from "~/components/ui/Button";

const Prompt = () => {
  const [promptInputValue, setPromptInputValue] = React.useState("");
  const [isPromptSubmitted, setIsPromptSubmitted] = React.useState(false);
  const [poster, setPoster] = React.useState("");

  const createPoster = async () => {
    const request = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInputValue }),
    });
    const response = await request.json();
    return response;
  };

  const { isFetching, isError, data } = useQuery({
    queryKey: ["posters"],
    queryFn: createPoster,
    enabled: isPromptSubmitted,
    onSuccess: (data) => {
      setPoster(data.data[0]);
      setIsPromptSubmitted(false);
    },
  });

  return (
    <>
      <div className="">
        <textarea
          value={promptInputValue}
          onChange={(e) => setPromptInputValue(e.target.value)}
          rows={4}
          placeholder="Enter your prompt here"
          className="w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setIsPromptSubmitted(true)}
          disabled={isFetching}
          className={buttonVariants({ variant: "subtle", size: "lg" })}
        >
          {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Poster
        </Button>
      </div>
      {isError && <p>Something went wrong!</p>}
      {data && <p>Poster generated!</p>}
      {poster && <img src={poster} alt="" />}
    </>
  );
};

export default Prompt;
