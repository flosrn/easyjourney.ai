import { create } from "zustand";

type SeedState = {
  seedValue: number | null;
  disabledSeedSelector: boolean;
};

type SeedAction = {
  setSeedValue: (value: number | null) => void;
  setDisabledSeedSelector: (value: boolean) => void;
};

export const useSeedStore = create<SeedAction & SeedState>()((set) => ({
  seedValue: null,
  disabledSeedSelector: false,
  setSeedValue: (value) => set(() => ({ seedValue: value })),
  setDisabledSeedSelector: (value) =>
    set(() => ({ disabledSeedSelector: value })),
}));
