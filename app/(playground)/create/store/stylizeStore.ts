import { create } from "zustand";

type StylizeState = {
  stylizeValue: number;
  disabledStylizeSelector: boolean;
};

type StylizeAction = {
  setStylizeValue: (value: number) => void;
  setDisabledStylizeSelector: (value: boolean) => void;
};

export const useStylizeStore = create<StylizeAction & StylizeState>()(
  (set) => ({
    stylizeValue: 100,
    disabledStylizeSelector: false,
    setStylizeValue: (value) => set(() => ({ stylizeValue: value })),
    setDisabledStylizeSelector: (value) =>
      set(() => ({ disabledStylizeSelector: value })),
  })
);
