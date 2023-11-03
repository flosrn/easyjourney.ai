import type { GenerationType } from "midjourney";
import { create } from "zustand";

export type RequestState = {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
};

type MidjourneyState = {
  generationType: GenerationType;
  requestState: RequestState;
  selectedImage: number | null;
  msg: string;
  promptHistoryId?: number;
};

type MidjourneyAction = {
  setGenerationType: (type?: GenerationType) => void;
  setRequestState: (state: RequestState) => void;
  setSelectedImage: (image: number | null) => void;
  setMsg: (msg: string) => void;
  setPromptHistoryId: (id: number | undefined) => void;
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
    promptHistoryId: undefined,
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
    setPromptHistoryId: (id) => {
      set({ promptHistoryId: id });
    },
  })
);
