import { useState } from "react";
import type { APIAttachment } from "discord-api-types/v10";

import { readStreamData } from "../lib/imageGenerationUtils";

type UseImageGeneration = {
  image?: APIAttachment | null;
  loading: boolean;
  error: string | unknown | null;
  generateImage: (data: any) => Promise<void>;
};

type ImageGenerationProps = {
  prompt: string;
};

const useImageGeneration = ({
  prompt,
}: ImageGenerationProps): UseImageGeneration => {
  const [image, setImage] = useState<APIAttachment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await fetch("/api/imagine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      console.log("status :", status);

      if (status === 200) {
        const response = await fetch("/api/get-messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (response.body) {
          const reader = response.body.getReader();
          await readStreamData(reader, setImage);
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error_: unknown) {
      setError(error_);
    }
  };

  return { image, loading, error, generateImage };
};

export default useImageGeneration;
