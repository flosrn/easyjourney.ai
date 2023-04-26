"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/Button";

import UserPosters from "../UserPosters";

type MidjourneyPromptProps = {};

const MidjourneyPromptOld = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPoster = () => {
    setIsLoading(true);
    // Initialiser l'EventSource
    const source = new EventSource(
      `/api/imagine-sse?prompt=${encodeURIComponent(promptInputValue)}`
    );
    console.log("source :", source);
    // Écouter les messages de l'EventSource
    source.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "image":
          console.log("new image iteration :", data.uri);
          setPoster(data.uri);
          break;
        case "completed":
          console.log("image generation completed :", data.data.uri);
          setPoster(data.data.uri);
          source.close();
          setIsLoading(false);
          toast.success("Poster generated successfully");
          break;
        case "error":
          console.log("error :", data.error);
          source.close();
          setIsLoading(false);
          toast.error("Error while generating poster");
          break;
        // No default
      }
    });

    // Écouter les erreurs de l'EventSource
    source.addEventListener("onerror", (event) => {
      console.error("EventSource error:", event);
      source.close();
    });

    // Écouter la fermeture de l'EventSource
    source.addEventListener("onclose", (event) => {
      console.log("EventSource closed:", event);
      source.close();
    });
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
          onClick={createPoster}
          // disabled={createPosterMutation.isLoading}
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

export default MidjourneyPromptOld;
