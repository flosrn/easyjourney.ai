import { create } from "zustand";

import { aspectRatios, type AspectRatio } from "../data/aspectRatios";

type RatioState = {
  selectedAspectRatio: AspectRatio;
};

type RatioAction = {
  setSelectedAspectRatio: (aspectRatio: AspectRatio) => void;
};

export const useRatioStore = create<RatioAction & RatioState>()((set) => ({
  selectedAspectRatio: aspectRatios[0],
  setSelectedAspectRatio: (ratio) =>
    set(() => ({ selectedAspectRatio: ratio })),
}));
