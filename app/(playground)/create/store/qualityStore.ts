import { create } from "zustand";

type QualityState = {
  qualityValue: string;
};

type QualityAction = {
  setQualityValue: (value: string) => void;
};

export const useQualityStore = create<QualityAction & QualityState>()(
  (set) => ({
    qualityValue: "1",
    setQualityValue: (value) => set(() => ({ qualityValue: value })),
  })
);
