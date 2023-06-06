import { create } from "zustand";

type SeedState = {
  seedValue: string;
  disabledSeedSelector: boolean;
};

type SeedAction = {
  setSeedValue: (value: string) => void;
  setDisabledSeedSelector: (value: boolean) => void;
};

export const useSeedStore = create<SeedAction & SeedState>()((set) => ({
  seedValue: "",
  disabledSeedSelector: false,
  setSeedValue: (value) => set(() => ({ seedValue: value })),
  setDisabledSeedSelector: (value) =>
    set(() => ({ disabledSeedSelector: value })),
}));
