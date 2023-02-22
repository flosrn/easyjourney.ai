"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { Button, buttonVariants } from "~/components/ui/Button";

type PromptProps = {};

const Prompt = ({}: PromptProps) => {
  const [prompt, setPrompt] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [logoImage, setLogoImage] = React.useState("");

  const generatePoster = async () => {
    setIsLoading(true);
    const request = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const response = await request.json();
    response && setIsLoading(false);
    response && setLogoImage(response.images[0]);
  };
  return (
    <>
      <div className="">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="Enter your prompt here"
          className="w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={generatePoster}
          disabled={isLoading}
          className={buttonVariants({ variant: "subtle", size: "lg" })}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Poster
        </Button>
      </div>
      {logoImage && (
        <img src={`data:image/png;base64,${logoImage}`} className="image" />
      )}
    </>
  );
};

export default Prompt;
