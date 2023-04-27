"use client";

import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { Button, buttonVariants } from "~/components/ui/Button";
import { Textarea } from "~/components/ui/Textarea";

import UserPosters from "../UserPosters";

type MidjourneyPromptProps = {};

const MidjourneyPrompt = ({}: MidjourneyPromptProps) => {
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [posterSaved, setPosterSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(" ");

  const { data: session } = useSession();
  const router = useRouter();

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
          } catch {
            // store the incomplete json string in the temporary value
            tempValue = jsonString;
          }
        }
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
            {poster && <img src={poster} alt="" className="w-full" />}
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
