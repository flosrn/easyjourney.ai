import { create } from "zustand";

type QualityState = {
  qualityValue: number;
  disabledQualitySelector: boolean;
};

type QualityAction = {
  setQualityValue: (value: number) => void;
  setDisabledQualitySelector: (value: boolean) => void;
};

export const useQualityStore = create<QualityAction & QualityState>()(
  (set) => ({
    qualityValue: 1,
    disabledQualitySelector: false,
    setQualityValue: (value) => set(() => ({ qualityValue: value })),
    setDisabledQualitySelector: (value) =>
      set(() => ({ disabledQualitySelector: value })),
  })
);
