import { create } from "zustand";

type StylizeState = {
  stylizeValue: string;
};

type StylizeAction = {
  setStylizeValue: (value: string) => void;
};

export const useStylizeStore = create<StylizeAction & StylizeState>()(
  (set) => ({
    stylizeValue: "100",
    setStylizeValue: (value) => set(() => ({ stylizeValue: value })),
  })
);
