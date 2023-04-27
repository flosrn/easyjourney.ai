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

  // https://vercel.com/docs/concepts/functions/edge-functions/streaming#caveats
  const readStreamData = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();

    let done = false;
    let tempValue = ""; // temporary value to store incomplete json strings

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      let chunkValue = decoder.decode(value);

      // if there is a temp value, prepend it to the incoming chunk
      if (tempValue) {
        chunkValue = tempValue + chunkValue;
        tempValue = "";
      }

      // Extract all JSON strings from the chunk
      const jsonStrings = chunkValue.match(/{.*?}/g);

      if (jsonStrings) {
        chunkValue = chunkValue.replace(jsonStrings.join(""), "");
        for (const jsonString of jsonStrings) {
          try {
            const data = JSON.parse(jsonString);
            console.log("data :", data);
            switch (data.type) {
              case "image_iteration": {
                const iterationImageUrl = data.iterationImage;
                setPoster(iterationImageUrl);
                break;
              }
              case "generation_complete": {
                const finalImageUrl = data.finalImage;
                setPoster(finalImageUrl);
                toast.success("Poster successfully generated!");
                break;
              }
              case "generation_failed": {
                toast.error("Poster generation failed");
                break;
              }
              case "message_not_found": {
                break;
              }
              default: {
                break;
              }
              // no default
            }
          } catch {
            console.log("error jsonString :", jsonString);
            // store the incomplete json string in the temporary value
            tempValue = jsonString;
          }
        }
      }
    }
  };

  const imaginePoster = async () => {
    setIsLoading(true);
    const response = await fetch("/api/streaming", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptInputValue }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      await readStreamData(reader);
    }

    setIsLoading(false);
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
