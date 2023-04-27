"use client";

import React, { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/Button";

import UserPosters from "../UserPosters";

type MidjourneyPromptProps = {};

const MidjourneyPrompt = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const readStreamData = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();

    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();
      if (done) break;

      const imageUrlReceived = decoder.decode(value);
      console.log("imageUrlReceived :", imageUrlReceived);
      setPoster(imageUrlReceived);
    }
  };

  console.log("isLoading :", isLoading);

  const imaginePoster = async () => {
    setIsLoading(true);
    const response = await fetch("/api/streaming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptInputValue,
      }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      await readStreamData(reader);
    }

    setIsLoading(false);
    toast.success("Poster generated!");
  };

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
          onClick={imaginePoster}
          disabled={isLoading}
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Poster
        </Button>
      </div>
      {poster && <img src={poster} width={500} height={500} alt="" />}
      <Suspense fallback={<div>Loading...</div>}>
        <UserPosters refetch={posterSaved} />
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  );
};

export default MidjourneyPrompt;
