import { create } from "zustand";

import { aspectRatios, type AspectRatio } from "../data/aspectRatios";

type RatioState = {
  selectedAspectRatio: AspectRatio;
  selectedRatio: string;
  disabledAspectRatioSelector: boolean;
};

type RatioAction = {
  setSelectedAspectRatio: (aspectRatio: AspectRatio) => void;
  setSelectedRatio: (value: string) => void;
  setDisabledAspectRatioSelector: (value: boolean) => void;
};

export const useRatioStore = create<RatioAction & RatioState>()((set) => ({
  selectedAspectRatio: aspectRatios[0],
  selectedRatio: "",
  disabledAspectRatioSelector: false,
  setSelectedAspectRatio: (ratio) =>
    set(() => ({ selectedAspectRatio: ratio })),
  setSelectedRatio: (value) => set(() => ({ selectedRatio: value })),
  setDisabledAspectRatioSelector: (value) =>
    set(() => ({ disabledAspectRatioSelector: value })),
}));
