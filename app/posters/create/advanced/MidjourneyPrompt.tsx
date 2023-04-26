"use client";

import React, { Suspense, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { imagineApiClient } from "~/services/midjourneyClient";

import { Button, buttonVariants } from "~/components/ui/Button";

import UserPosters from "../UserPosters";

type MidjourneyPromptProps = {};

const imagineApi = async (
  prompt: string,
  onIteration: (uri: string) => void,
  onComplete: (uri: string) => void
) => {
  await imagineApiClient(prompt, onIteration, onComplete);
};

const MidjourneyPrompt = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createPoster = useCallback(() => {
    console.log("start generation");
    setIsLoading(true);
    imagineApi(
      promptInputValue,
      (uri: string) => {
        setPoster(uri);
      },
      (data: any) => {
        console.log("data :", data);
        setPoster(data.uri);
        setIsLoading(false);
        toast.success("Poster generated successfully");
      }
    ).catch((error) => {
      console.error("Error in imagineApi:", error);
      setIsLoading(false);
      toast.error("Error while generating poster");
    });
  }, [promptInputValue]);

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

export default MidjourneyPrompt;
