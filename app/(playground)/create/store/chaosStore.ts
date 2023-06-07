import { create } from "zustand";

type ChaosState = {
  chaosValue: number;
  isChaosSelectorDisabled: boolean;
};

type ChaosAction = {
  setChaosValue: (value: number) => void;
  setIsChaosSelectorDisabled: (value: boolean) => void;
};

export const useChaosStore = create<ChaosAction & ChaosState>()((set) => ({
  chaosValue: 0,
  isChaosSelectorDisabled: false,
  setChaosValue: (value) => set(() => ({ chaosValue: value })),
  setIsChaosSelectorDisabled: (value) =>
    set(() => ({ isChaosSelectorDisabled: value })),
}));
