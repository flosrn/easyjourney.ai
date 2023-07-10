import { create } from "zustand";

export type RequestState = {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};

export type GenerationType =
  | "imagine"
  | "save"
  | "upscale"
  | "variation"
  | null;

type MidjourneyState = {
  generationType: GenerationType;
  requestState: RequestState;
  selectedImage: number | null;
  msg: string;
};

type MidjourneyAction = {
  setGenerationType: (type: GenerationType) => void;
  setRequestState: (state: RequestState) => void;
  setSelectedImage: (image: number) => void;
  setMsg: (msg: string) => void;
};

export const useMidjourneyStore = create<MidjourneyAction & MidjourneyState>()(
  (set) => ({
    generationType: null,
    requestState: {
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
    selectedImage: null,
    msg: "",
    setGenerationType: (type) => {
      set({ generationType: type });
    },
    setRequestState: (newState: RequestState) => {
      set((state) => ({
        requestState: {
          ...state.requestState,
          ...newState,
        },
      }));
    },
    setSelectedImage: (image) => {
      set({ selectedImage: image });
    },
    setMsg: (msg) => {
      set({ msg });
    },
  })
);
