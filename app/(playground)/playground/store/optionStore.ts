import { create } from "zustand";

// eslint-disable-next-line no-shadow
export enum Option {
  "ZOOM" = "zoom",
  "PAN" = "pan",
  "VARY" = "vary",
  "UPSCALE" = "upscale",
}

type OptionState = {
  option: Option;
};

type OptionAction = {
  setOption: (value: Option) => void;
};

export const useOptionStore = create<OptionAction & OptionState>()((set) => ({
  option: Option.ZOOM,
  setOption: (value) => set(() => ({ option: value })),
}));
