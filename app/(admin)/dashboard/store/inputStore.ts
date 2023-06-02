import { create } from "zustand";

type InputState = {
  inputValue: string;
};

type InputAction = {
  setInputValue: (value: string) => void;
};

export const useInputStore = create<InputAction & InputState>()((set) => ({
  inputValue: "",
  setInputValue: (value) => set(() => ({ inputValue: value })),
}));
