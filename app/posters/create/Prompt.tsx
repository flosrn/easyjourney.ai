"use client";

import React, { Suspense, useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@uploadcare/upload-client";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { env } from "~/env.mjs";

import { Button, buttonVariants } from "~/components/ui/Button";

import { cn } from "~/lib/classNames";

import UserPosters from "./UserPosters";

const BASE_STABLE_DIFFUSION_URL = "https://79382359-a474-493e.gradio.live";

type PromptProps = {};

const text2img = async (prompt: string) => {
  const response = await fetch(
    `${BASE_STABLE_DIFFUSION_URL}/sdapi/v1/txt2img`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ prompt }),
    }
  );
  return response.json();
};

const base64ToBlob = async (base64: string) => {
  const response = await fetch(`data:image/jpeg;base64,${base64}`);
  const blob = await response.blob();
  return blob;
};

const uploadToUploadcare = async (blob: Blob, fileName: string) => {
  const trimmedFileName = fileName.slice(0, 128);
  const response = await uploadFile(blob, {
    publicKey: env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
    fileName: trimmedFileName,
    store: true,
  });
  return response;
};

const savePosterToDatabase = async (poster: string, prompt: string) => {
  const response = await fetch("/api/posters/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: poster,
      prompt,
    }),
  });
  return response.json();
};

const Prompt = ({}: PromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterSaved, setPosterSaved] = useState<boolean>(false);

  const createPosterMutation = useMutation(
    async () => text2img(promptInputValue),
    {
      onSuccess: () => {
        setPosterSaved(false);
        toast.success("Poster generated!");
      },
    }
  );

  const savePosterMutation = useMutation(
    async () => {
      const blob = await base64ToBlob(poster);
      const uploadcareResponse = await uploadToUploadcare(
        blob,
        promptInputValue
      );
      const posterUrl = uploadcareResponse.cdnUrl;
      posterUrl &&
        (await savePosterToDatabase(
          uploadcareResponse.cdnUrl,
          promptInputValue
        ));
    },
    {
      onSuccess: () => {
        setPosterSaved(true);
        setPoster("");
        toast.success("Poster saved!");
      },
    }
  );

  const createPoster = useCallback(async () => {
    try {
      const data = await createPosterMutation.mutateAsync();
      setPoster(data?.images?.[0]);
    } catch {
      toast.error("Something went wrong!");
    }
  }, [createPosterMutation]);

  const savePoster = useCallback(async () => {
    try {
      return savePosterMutation.mutateAsync();
    } catch {
      toast.error("Something went wrong!");
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
        {poster && !posterSaved && (
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
      {poster && <img src={`data:image/png;base64,${poster}`} alt="poster" />}
      <Suspense fallback={<div>Loading...</div>}>
        <UserPosters refetch={posterSaved} />
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Prompt;
