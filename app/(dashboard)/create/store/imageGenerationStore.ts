import type { APIAttachment } from "discord-api-types/v10";
import { create } from "zustand";

import { readStreamData } from "../lib/imageGenerationUtils";

type ImageGenerationState = {
  image: APIAttachment | null;
  upscaledImage: APIAttachment | null;
  isLoading: boolean;
  isImageGenerated: boolean;
  isImageUpscaled: boolean;
  error: string | unknown | null;
  message?: string;
  selectedImage: number | null;
};

type ImageData = APIAttachment & {
  prompt: string;
  messageId: string;
  messageHash: string;
};

export type ImageGenerationSetAction = {
  setImage: (image: APIAttachment | null) => void;
  setUpscaledImage: (image: APIAttachment | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | unknown | null) => void;
  setMessage: (message: string) => void;
  setSelectedImage: (imageSelected: number) => void;
  setClear: () => void;
};

type ImageGenerationAction = ImageGenerationSetAction & {
  generateImage: (prompt: string) => Promise<void>;
  upscaleImage: (index: number | null, image: ImageData) => Promise<void>;
};

export const useImageGenerationStore = create<
  ImageGenerationAction & ImageGenerationState
>()((set) => {
  const setImage = (image: APIAttachment | null) => {
    set(() => ({ image }));
  };
  const setUpscaledImage = (upscaledImage: APIAttachment | null) => {
    set(() => ({ upscaledImage }));
  };
  const setIsLoading = (isLoading: boolean) => {
    set(() => ({ isLoading }));
  };
  const setError = (error: string | unknown | null) => {
    set(() => ({ error }));
  };
  const setMessage = (message: string) => {
    set(() => ({ message }));
  };
  const setSelectedImage = (index: number) => {
    set(() => ({ selectedImage: index }));
  };
  const setClear = () => {
    set(() => ({
      image: null,
      isLoading: false,
      isImageGenerated: false,
      isImageUpscaled: false,
      error: null,
      message: "",
      selectedImage: null,
    }));
  };

  const actions = {
    setImage,
    setUpscaledImage,
    setIsLoading,
    setError,
    setMessage,
    setSelectedImage,
    setClear,
  };

  return {
    image: null,
    upscaledImage: null,
    isLoading: false,
    isImageGenerated: false,
    isImageUpscaled: false,
    error: null,
    message: "",
    selectedImage: null,
    ...actions,
    generateImage: async (prompt) => {
      setImage(null);
      setIsLoading(true);
      setError(null);
      setMessage("");

      try {
        const { status } = await fetch("/api/imagine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (status === 200) {
          setMessage(
            "Your image is currently being generated by Midjourney, please wait a moment."
          );
          const response = await fetch("/api/get-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
          });

          if (response.body) {
            const reader = response.body.getReader();
            await readStreamData(reader, actions);
          }
        } else {
          setMessage(
            `Something went wrong while generating the image, please try again.\n\nStatus code: ${status}`
          );
          throw new Error("Something went wrong");
        }
      } catch (error_: unknown) {
        setMessage(
          `Something went wrong while generating the image, please try again.\n\n${error_}`
        );
        setError(error_);
      }
    },
    upscaleImage: async (index, image) => {
      setIsLoading(true);
      setError(null);
      setMessage("");

      const { prompt, messageId, messageHash } = image;

      try {
        const { status } = await fetch("/api/upscale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index,
            messageId,
            messageHash,
          }),
        });

        if (status === 200) {
          setMessage(
            "Your image is currently being generated by Midjourney, please wait a moment."
          );
          const response = await fetch("/api/get-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, index }),
          });

          if (response.body) {
            const reader = response.body.getReader();
            await readStreamData(reader, actions);
          }
        } else {
          setMessage(
            `Something went wrong while upscaling the image, please try again.\n\nStatus code: ${status}`
          );
          throw new Error("Something went wrong");
        }
      } catch (error_: unknown) {
        setMessage(
          `Something went wrong while upscaling the image, please try again.\n\n${error_}`
        );
        setError(error_);
      }
    },
  };
});
