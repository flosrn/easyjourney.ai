import { create } from "zustand";

type SeedState = {
  seedValue?: number;
  isSeedSelectorDisabled: boolean;
};

type SeedAction = {
  setSeedValue: (value?: number) => void;
  setIsSeedSelectorDisabled: (value: boolean) => void;
};

export const useSeedStore = create<SeedAction & SeedState>()((set) => ({
  seedValue: undefined,
  isSeedSelectorDisabled: false,
  setSeedValue: (value) => set(() => ({ seedValue: value })),
  setIsSeedSelectorDisabled: (value) =>
    set(() => ({ isSeedSelectorDisabled: value })),
}));
