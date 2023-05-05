import { uploadFile } from "@uploadcare/upload-client";
import type { APIAttachment } from "discord-api-types/v10";
import toast from "react-hot-toast";
import { create } from "zustand";
import { blacklistedWords } from "~/data/bannedWords";
import { env } from "~/env.mjs";

import { readStreamData } from "../lib/imageGenerationUtils";

export type ImageData = APIAttachment & {
  type?: string;
  prompt: string;
  messageId: string;
  messageHash: string;
  error?: string;
};

type ImageGenerationState = {
  images: ImageData[];
  imageIndex: number;
  imageType: "generation" | "upscale" | "variation" | null;
  isLoading: boolean;
  error: string | unknown | null;
  message?: string;
  selectedImage: number | null;
  loadingType: "generation" | "upscale" | "variation" | null;
  showActionsButtons: boolean;
};

export type ImageGenerationSetAction = {
  addImage: (image: ImageData) => void;
  prevImage: () => void;
  nextImage: () => void;
  setImageType: (
    imageType: "generation" | "upscale" | "variation" | null
  ) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | unknown | null) => void;
  setMessage: (message: string) => void;
  setSelectedImage: (imageSelected: number | null) => void;
  setClear: () => void;
  setLoadingType: (
    loadingType: "generation" | "upscale" | "variation" | null
  ) => void;
  setShowActionsButtons: (showActionsButtons: boolean) => void;
};

type ImageGenerationAction = ImageGenerationSetAction & {
  generateImage: (prompt: string) => Promise<void>;
  upscaleImage: (index: number | null, image: ImageData) => Promise<void>;
  variationImage: (index: number | null, image: ImageData) => Promise<void>;
  uploadImage: (image: ImageData, prompt: string) => Promise<void>;
};

export const useImageGenerationStore = create<
  ImageGenerationAction & ImageGenerationState
>()((set) => {
  const setImageType = (
    imageType: "generation" | "upscale" | "variation" | null
  ) => {
    set(() => ({ imageType }));
  };
  const prevImage = () => {
    set((state) => ({ imageIndex: state.imageIndex - 1 }));
  };
  const nextImage = () => {
    set((state) => ({ imageIndex: state.imageIndex + 1 }));
  };
  const setIsLoading = (isLoading: boolean) => {
    set(() => ({ isLoading }));
  };
  const setMessage = (message: string) => {
    set(() => ({ message }));
  };
  const setError = (error: string | unknown | null) => {
    set(() => ({ error }));
  };
  const setSelectedImage = (index: number | null) => {
    set(() => ({ selectedImage: index }));
  };
  const setClear = () => {
    set(() => ({
      images: [],
      isLoading: false,
      error: null,
      message: "",
      selectedImage: null,
    }));
  };
  const setLoadingType = (
    loadingType: "generation" | "upscale" | "variation" | null
  ) => {
    set(() => ({ loadingType }));
  };
  const setShowActionsButtons = (showActionsButtons: boolean) => {
    set(() => ({ showActionsButtons }));
  };

  const addImage = (image: ImageData) => {
    set((state) => {
      const isGenerated = image.type === "generation_complete";
      const isUpscaled = image.type === "image_upscaled";
      const isVariation = image.type === "variation_complete";
      const isIteration = image.type === "image_iteration";
      const isLoading = image.type === "loading";
      setTimeout(() => {
        isGenerated && toast.success("Poster successfully generated!");
        isUpscaled && toast.success("Poster successfully upscaled!");
        isVariation && toast.success("Poster successfully generated!");
      }, 800);
      if (isGenerated || isUpscaled || isVariation) {
        return {
          images: [...state.images, image],
          imageIndex: [...state.images, image].length - 1,
        };
      } else if (isLoading) {
        return { images: [...state.images] };
      } else if (isIteration) {
        return { images: [image], imageIndex: 0 };
      } else {
        return { images: [] };
      }
    });
  };

  const actions = {
    addImage,
    prevImage,
    nextImage,
    setImageType,
    setIsLoading,
    setError,
    setMessage,
    setSelectedImage,
    setClear,
    setLoadingType,
    setShowActionsButtons,
  };

  return {
    images: [],
    imageIndex: 0,
    imageType: null,
    isLoading: false,
    error: null,
    message: "",
    selectedImage: 0,
    loadingType: null,
    showActionsButtons: false,
    ...actions,
    generateImage: async (prompt) => {
      setIsLoading(true);
      setLoadingType("generation");
      setError(null);
      setMessage("");

      // verify if prompt not contains any of the blacklisted words
      blacklistedWords.map((word) => {
        if (prompt.toLowerCase().includes(word.toLowerCase())) {
          setClear();
          setMessage(
            `Your prompt contains a blacklisted word: ${word}. Please try again.`
          );
          toast.error(`Your prompt contains a blacklisted word: ${word}`);
          throw new Error("Blacklisted word");
        }
      });

      try {
        const { status } = await fetch("/api/imagine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (status === 200) {
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
      setLoadingType("upscale");
      setError(null);
      setMessage("");
      setSelectedImage(0);

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
          const response = await fetch("/api/get-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, index, option: "upscale" }),
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
    variationImage: async (index, image) => {
      setIsLoading(true);
      setLoadingType("variation");
      setError(null);
      setMessage("");
      setSelectedImage(0);

      const { prompt, messageId, messageHash } = image;

      try {
        const { status } = await fetch("/api/variation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index,
            messageId,
            messageHash,
          }),
        });

        if (status === 200) {
          const response = await fetch("/api/get-messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, index, option: "variation" }),
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
    uploadImage: async (image: ImageData, prompt: string) => {
      const uploadResponse = await uploadFile(image.proxy_url, {
        publicKey: env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
        fileName: image.filename,
        store: true,
      });
      console.log("uploadResponse :", uploadResponse);
      const imageUrl = uploadResponse.cdnUrl;
      if (imageUrl) {
        const saveResponse = await fetch("/api/posters/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: imageUrl,
            prompt,
          }),
        });
        const data = await saveResponse.json();
        console.log("data :", data);
      }
    },
  };
});
