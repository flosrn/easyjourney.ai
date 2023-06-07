import { create } from "zustand";

type SeedState = {
  seedValue?: number;
  disabledSeedSelector: boolean;
};

type SeedAction = {
  setSeedValue: (value?: number) => void;
  setDisabledSeedSelector: (value: boolean) => void;
};

export const useSeedStore = create<SeedAction & SeedState>()((set) => ({
  seedValue: undefined,
  disabledSeedSelector: false,
  setSeedValue: (value) => set(() => ({ seedValue: value })),
  setDisabledSeedSelector: (value) =>
    set(() => ({ disabledSeedSelector: value })),
}));
