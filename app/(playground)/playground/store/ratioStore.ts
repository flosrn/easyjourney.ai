import { create } from "zustand";

import { aspectRatios, type AspectRatio } from "../data/aspectRatios";

type RatioState = {
  selectedAspectRatio: AspectRatio;
  selectedRatio: string;
  isAspectRatioSelectorDisabled: boolean;
};

type RatioAction = {
  setSelectedAspectRatio: (aspectRatio: AspectRatio) => void;
  setSelectedRatio: (value: string) => void;
  setIsAspectRatioSelectorDisabled: (value: boolean) => void;
};

export const useRatioStore = create<RatioAction & RatioState>()((set) => ({
  selectedAspectRatio: aspectRatios[0],
  selectedRatio: "",
  isAspectRatioSelectorDisabled: false,
  setSelectedAspectRatio: (ratio) =>
    set(() => ({ selectedAspectRatio: ratio })),
  setSelectedRatio: (value) => set(() => ({ selectedRatio: value })),
  setIsAspectRatioSelectorDisabled: (value) =>
    set(() => ({ isAspectRatioSelectorDisabled: value })),
}));
