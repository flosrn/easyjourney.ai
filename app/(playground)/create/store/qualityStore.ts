import { create } from "zustand";

type QualityState = {
  qualityValue: number;
  isQualitySelectorDisabled: boolean;
};

type QualityAction = {
  setQualityValue: (value: number) => void;
  setIsQualitySelectorDisabled: (value: boolean) => void;
};

export const useQualityStore = create<QualityAction & QualityState>()(
  (set) => ({
    qualityValue: 1,
    isQualitySelectorDisabled: false,
    setQualityValue: (value) => set(() => ({ qualityValue: value })),
    setIsQualitySelectorDisabled: (value) =>
      set(() => ({ isQualitySelectorDisabled: value })),
  })
);
