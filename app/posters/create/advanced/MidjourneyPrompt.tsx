"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/Button";
import { Textarea } from "~/components/ui/Textarea";

import UserPosters from "../UserPosters";
import { ImageGrid } from "./ImageGrid";

type MidjourneyPromptProps = {};

type PosterData = {
  id: string;
  uri: string;
  hash: string;
  content: string;
};

const MidjourneyPrompt = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterData, setPosterData] = useState<PosterData | null>(null);
  const [isPosterUpscaled, setIsPosterUpscaled] = useState<boolean>(false);
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(" ");

  const { data: session } = useSession();
  const router = useRouter();

  // https://vercel.com/docs/concepts/functions/edge-functions/streaming#caveats
  const readImagineStreamData = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();

    let done = false;
    const tempValue = ""; // temporary value to store incomplete json strings
    let jsonStringBuffer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const decodedValue = decoder.decode(value);
      jsonStringBuffer += decodedValue;

      const jsonRegex = /{[^{}]*}/g;
      let jsonMatch;

      while ((jsonMatch = jsonRegex.exec(jsonStringBuffer)) !== null) {
        const jsonString = jsonMatch[0];

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
              setPoster(data.uri);
              setPosterData(data);
              setTimeout(() => {
                toast.success("Poster successfully generated!");
              }, 1000);
              setMessage("Click on the image you want to upscale");
              break;
            }
            case "generation_failed": {
              console.log("generation failed:", data.error);
              toast.error("Poster generation failed");
              break;
            }
            case "message_not_found": {
              break;
            }
            default: {
              break;
            }
          }
        } catch (error) {
          console.log("error :", error);
          break;
        }

        jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
      }
    }
  };

  const readUpscaleStreamData = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();

    let done = false;
    const tempValue = ""; // temporary value to store incomplete json strings
    let jsonStringBuffer = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const decodedValue = decoder.decode(value);
      jsonStringBuffer += decodedValue;

      const jsonRegex = /{[^{}]*}/g;
      let jsonMatch;

      while ((jsonMatch = jsonRegex.exec(jsonStringBuffer)) !== null) {
        const jsonString = jsonMatch[0];

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
              setPoster(data.uri);
              setPosterData(data);
              setIsPosterUpscaled(true);
              setTimeout(() => {
                toast.success("Poster successfully upscaled!");
              }, 1000);
              setMessage("Click on the image you want to upscale");
              break;
            }
            case "generation_failed": {
              console.log("generation failed:", data.error);
              toast.error("Poster generation failed");
              break;
            }
            case "message_not_found": {
              break;
            }
            default: {
              break;
            }
          }
        } catch (error) {
          console.log("error :", error);
          break;
        }

        jsonStringBuffer = jsonStringBuffer.slice(jsonRegex.lastIndex);
      }
    }
  };

  const imaginePoster = async () => {
    if (!session) {
      toast.error("You need to be logged in to generate a poster");
      setTimeout(() => {
        router.push("/api/auth/signin");
      }, 2000);
      return;
    }
    setMessage("");
    setIsLoading(true);
    setIsPosterUpscaled(false);
    const response = await fetch("/api/imagine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptInputValue }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      await readImagineStreamData(reader);
    }

    setIsLoading(false);
  };

  const upscalePoster = async (index: number) => {
    setMessage("");
    setIsLoading(true);
    const response = await fetch("/api/upscale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...posterData, index }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      await readUpscaleStreamData(reader);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex-center">
        <div className="mt-5 w-[400px]">
          <Textarea
            value={promptInputValue}
            placeholder="Enter your prompt here"
            onChange={(e) => setPromptInputValue(e.target.value)}
            className="w-full"
          />
          <div className="my-3 h-5 text-sm">
            <p>{message}</p>
          </div>
          <div className="my-5">
            {poster && (
              <ImageGrid
                imgUrl={poster}
                clickHandler={upscalePoster}
                showGrid={isPosterUpscaled}
              />
            )}
          </div>
          <div className="flex-center gap-4">
            <Button
              onClick={imaginePoster}
              disabled={isLoading}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Poster
            </Button>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <UserPosters refetch={posterSaved} />
      </Suspense>
      <Toaster position="bottom-right" />
    </>
  );
};

export default MidjourneyPrompt;
