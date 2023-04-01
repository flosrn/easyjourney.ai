"use client";

import React, { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Button, buttonVariants } from "~/components/ui/Button";

import { cn } from "~/lib/classNames";

const Prompt = () => {
  const [promptInputValue, setPromptInputValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [poster, setPoster] = React.useState("");

  const createPosterMutation = useMutation(async () => {
    const request = await fetch("/api/posters/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInputValue }),
    });
    return request.json();
  });

  const savePosterMutation = useMutation(async () => {
    const request = await fetch("/api/posters/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Titre du poster",
        prompt: promptInputValue,
        poster,
      }),
    });
    return request.json();
  });

  const createPoster = useCallback(async () => {
    try {
      const data = await createPosterMutation.mutateAsync();
      if (!data?.images?.[0]) {
        setErrorMessage(data.error || "Something went wrong!");
        return;
      }
      setPoster(data?.images?.[0]);
    } catch {
      setErrorMessage("Something went wrong!");
    }
  }, [createPosterMutation]);

  const savePoster = useCallback(async () => {
    try {
      return savePosterMutation.mutateAsync();
    } catch {
      setErrorMessage("Something went wrong!");
    }
  }, [savePosterMutation]);

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
          disabled={createPosterMutation.isLoading}
          className={buttonVariants({ variant: "subtle", size: "lg" })}
        >
          {createPosterMutation.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Generate Poster
        </Button>
        {poster && (
          <Button
            onClick={savePoster}
            disabled={savePosterMutation.isLoading}
            className={cn(
              buttonVariants({ variant: "subtle", size: "lg" }),
              "dark:bg-green-400 dark:hover:bg-green-500"
            )}
          >
            {savePosterMutation.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Poster
          </Button>
        )}
      </div>
      {(createPosterMutation.isError || errorMessage) && <p>{errorMessage}</p>}
      {poster && <img src={`data:image/png;base64,${poster}`} alt="" />}
    </>
  );
};

export default Prompt;
