import { create } from "zustand";

type StylizeState = {
  stylizeValue: number;
  isStylizeSelectorDisabled: boolean;
};

type StylizeAction = {
  setStylizeValue: (value: number) => void;
  setIsStylizeSelectorDisabled: (value: boolean) => void;
};

export const useStylizeStore = create<StylizeAction & StylizeState>()(
  (set) => ({
    stylizeValue: 100,
    isStylizeSelectorDisabled: false,
    setStylizeValue: (value) => set(() => ({ stylizeValue: value })),
    setIsStylizeSelectorDisabled: (value) =>
      set(() => ({ isStylizeSelectorDisabled: value })),
  })
);
