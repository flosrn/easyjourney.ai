import { blacklistedWords } from "~/data/blacklistedWords";
import type { APIAttachment } from "discord-api-types/v10";
import toast from "react-hot-toast";
import { create } from "zustand";

import readStreamData from "../lib/readStreamData";

export type ImageData = APIAttachment & {
  type?: string;
  prompt: string;
  messageId: string;
  messageHash: string;
  referencedImage?: APIAttachment;
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
  loadingType: "generation" | "upload" | "upscale" | "variation" | null;
  showActionsButtons: boolean;
  isImageUploaded: boolean;
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
  setIsImageUploaded: (isImageUploaded: boolean) => void;
  retry: () => void;
};

type UploadImage = (
  image: ImageData,
  prompt: string,
  ratio: string,
  style: string,
  imageSelected: number | null,
  options: {
    chaos: number;
    quality: number;
    stylize: number;
    stop: number;
    version: string;
    tile: boolean;
    seed?: number;
  },
  username?: string
) => Promise<void>;

type ImageGenerationAction = ImageGenerationSetAction & {
  generateImage: (prompt: string) => Promise<void>;
  upscaleImage: (index: number | null, image: ImageData) => Promise<void>;
  variationImage: (index: number | null, image: ImageData) => Promise<void>;
  uploadImage: UploadImage;
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
      selectedImage: 0,
      imageType: null,
      isImageUploaded: false,
    }));
  };
  const setLoadingType = (
    loadingType: "generation" | "upload" | "upscale" | "variation" | null
  ) => {
    set(() => ({ loadingType }));
  };
  const setShowActionsButtons = (showActionsButtons: boolean) => {
    set(() => ({ showActionsButtons }));
  };
  const setIsImageUploaded = (isImageUploaded: boolean) => {
    set(() => ({ isImageUploaded }));
  };
  const retry = () => {
    set(() => ({ isLoading: false, error: null }));
  };

  const addImage = (image: ImageData) => {
    set((state) => {
      const isGenerated = image.type === "generation_complete";
      const isUpscaled = image.type === "image_upscaled";
      const isVariation = image.type === "variation_complete";
      const isIteration = image.type === "image_iteration";
      const isReferencedImage = image.type === "referenced_image";
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
      } else if (isReferencedImage) {
        const lastImage = state.images.at(-1);
        return {
          images: lastImage && [
            ...state.images.slice(0, -1),
            { ...lastImage, referencedImage: image },
          ],
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
    setIsImageUploaded,
    retry,
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
    isImageUploaded: false,
    ...actions,
    generateImage: async (prompt) => {
      setIsLoading(true);
      setLoadingType("generation");
      setError(null);
      setMessage("");
      setImageType(null);
      setIsImageUploaded(false);

      // verify if prompt not contains any of the blacklisted words
      const inputWords = prompt.toLowerCase().split(/\s+/);
      blacklistedWords.map((word) => {
        if (inputWords.includes(word.toLowerCase())) {
          setClear();
          setMessage(
            `Your prompt contains a blacklisted word: ${word}. Please try again.`
          );
          toast.error(`Your prompt contains a blacklisted word: ${word}`);
          throw new Error("Blacklisted word");
        }
      });

      try {
        const response = await fetch("/api/midjourney/imagine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const { status } = await response.json();
        if (status === 401) {
          setMessage(`User not logged in, please authenticate`);
        } else if (status === 204) {
          // eslint-disable-next-line no-shadow
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
      setImageType(null);
      setIsImageUploaded(false);

      const { prompt, messageId, messageHash } = image;

      try {
        const { status } = await fetch("/api/midjourney/upscale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index,
            messageId,
            messageHash,
          }),
        });

        if (status === 401) {
          setMessage(`User not logged in, please authenticate`);
        } else if (status === 200) {
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
      setImageType(null);
      setIsImageUploaded(false);

      const { prompt, messageId, messageHash } = image;

      try {
        const { status } = await fetch("/api/midjourney/variation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index,
            messageId,
            messageHash,
          }),
        });

        if (status === 401) {
          setMessage(`User not logged in, please authenticate`);
        } else if (status === 200) {
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
    uploadImage: async (
      image,
      prompt,
      ratio,
      style,
      imageSelected,
      options,
      username
    ) => {
      setIsLoading(true);
      setLoadingType("upload");
      setError(null);
      setMessage("");
      const { url, filename, width, height, size, referencedImage } = image;
      const response = await fetch("/api/posters/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: url,
          filename,
          width,
          height,
          size,
          prompt,
          ratio,
          style,
          imageSelected,
          referencedImage,
          ...options,
        }),
      });
      const data = await response.json();
      if (data?.data?.image) {
        toast.success("Image saved successfully");
        setIsLoading(false);
        setLoadingType(null);
        setIsImageUploaded(true);
        setSelectedImage(0);
        await fetch("/api/revalidate?path=/posters/new");
        username && (await fetch(`/api/revalidate?path=/profile/${username}`));
      } else {
        toast.error("Something went wrong while saving the image");
        setIsLoading(false);
        setLoadingType(null);
        setIsImageUploaded(false);
      }
    },
  };
});
