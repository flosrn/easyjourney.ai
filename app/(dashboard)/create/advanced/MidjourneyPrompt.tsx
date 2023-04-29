"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { Textarea } from "~/components/ui/Textarea";

import { ImageGrid } from "./ImageGrid";

type MidjourneyPromptProps = {};

type PosterData = {
  id: string;
  uri: string;
  hash: string;
  content: string;
};

enum ButtonType {
  GENERATION = "generation",
  UPSCALING = "upscaling",
}

const MidjourneyPrompt = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterData, setPosterData] = useState<PosterData | null>(null);
  const [isPosterUpscaled, setIsPosterUpscaled] = useState<boolean>(false);
  const [showImageGrid, setShowImageGrid] = useState<boolean>(false);
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(" ");
  const [imageSelected, setImageSelected] = useState<number>(0);
  const [buttonType, setButtonType] = useState<ButtonType>(
    ButtonType.GENERATION
  );

  const isGeneration = buttonType === ButtonType.GENERATION;
  const isUpscaling = buttonType === ButtonType.UPSCALING;

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
              setShowImageGrid(true);
              setButtonType(ButtonType.UPSCALING);
              setIsPosterUpscaled(false);
              setTimeout(() => {
                toast.success("Poster successfully generated!");
                setMessage("Click on the image you want to upscale");
              }, 2000);
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
              setShowImageGrid(false);
              setIsPosterUpscaled(true);
              setTimeout(() => {
                toast.success("Poster successfully upscaled!");
              }, 1000);
              setMessage("");
              break;
            }
            case "generation_failed": {
              console.log("upscale failed:", data.error);
              toast.error("Poster upscaling failed");
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
    setShowImageGrid(false);
    setButtonType(ButtonType.GENERATION);
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
    if (imageSelected === 0) {
      toast.error("You need to select an image to upscale");
      return;
    }
    setMessage("");
    setIsLoading(true);
    setIsPosterUpscaled(false);
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

  const handleImageClick = (index: number) => {
    setImageSelected(index);
    setMessage(
      `Image ${index} selected. Click on upscale button to start upscaling`
    );
  };

  return (
    <>
      <div className="flex-center">
        <Card className="w-full max-w-2xl rounded-[0.5rem]">
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
            <CardDescription>Write your prompt here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-5">
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
                <div className="relative">
                  {poster && (
                    <>
                      <a
                        href={isPosterUpscaled ? poster : undefined}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={poster}
                          alt="Divided image"
                          className="w-full"
                        />
                      </a>
                      {showImageGrid && (
                        <ImageGrid
                          imageSelected={imageSelected}
                          clickHandler={handleImageClick}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex-center gap-4">
                <Button
                  onClick={async () =>
                    isGeneration
                      ? imaginePoster()
                      : upscalePoster(imageSelected)
                  }
                  disabled={isLoading}
                  className={buttonVariants({ variant: "default", size: "lg" })}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {`${isGeneration ? "Generate" : "Upscale"} Poster ${
                    isUpscaling && imageSelected ? imageSelected : ""
                  }`}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      {/*  <UserPosters refetch={posterSaved} />*/}
      {/*</Suspense>*/}
      <Toaster position="bottom-right" />
    </>
  );
};

export default MidjourneyPrompt;
