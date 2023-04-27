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

      // match json string and extract it from the chunk
      const match = chunkValue.match(/{(.*?)}/);
      if (match) {
        tempValue = chunkValue.replace(match[0], "");
        chunkValue = match[0];
      }

      try {
        const data = JSON.parse(chunkValue);
        console.log("data :", data);
        if (data.type === "image_iteration") {
          // Mettez à jour l'état avec l'image de l'itération en cours
          const iterationImageUrl = data.iterationImage;
          setPoster(iterationImageUrl);
        } else if (data.type === "generation_complete") {
          // La génération est terminée, effectuez les actions nécessaires ici
          const finalImageUrl = data.finalImage;
          setPoster(finalImageUrl);
        }
      } catch {
        console.log("Error parsing json");
        console.log("chunkValue :", chunkValue);
        // store the incomplete json string in the temporary value
        tempValue = chunkValue;
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
