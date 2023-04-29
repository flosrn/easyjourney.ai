import { create } from "zustand";

type PromptState = {
  promptValue: string;
};

type PromptAction = {
  setPromptValue: (value: string) => void;
};

export const usePromptStore = create<PromptAction & PromptState>()((set) => ({
  promptValue: "",
  setPromptValue: (value) => set(() => ({ promptValue: value })),
}));
