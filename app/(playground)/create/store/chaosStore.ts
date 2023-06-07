import { create } from "zustand";

type ChaosState = {
  chaosValue: number;
  disabledChaosSelector: boolean;
};

type ChaosAction = {
  setChaosValue: (value: number) => void;
  setDisabledChaosSelector: (value: boolean) => void;
};

export const useChaosStore = create<ChaosAction & ChaosState>()((set) => ({
  chaosValue: 0,
  disabledChaosSelector: false,
  setChaosValue: (value) => set(() => ({ chaosValue: value })),
  setDisabledChaosSelector: (value) =>
    set(() => ({ disabledChaosSelector: value })),
}));
