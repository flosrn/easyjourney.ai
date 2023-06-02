import { create } from "zustand";

type SeedState = {
  seedValue: string;
};

type SeedAction = {
  setSeedValue: (value: string) => void;
};

export const useSeedStore = create<SeedAction & SeedState>()((set) => ({
  seedValue: "",
  setSeedValue: (value) => set(() => ({ seedValue: value })),
}));
