import { create } from "zustand";

type ChaosState = {
  chaosValue: string;
};

type ChaosAction = {
  setChaosValue: (value: string) => void;
};

export const useChaosStore = create<ChaosAction & ChaosState>()((set) => ({
  chaosValue: "0",
  setChaosValue: (value) => set(() => ({ chaosValue: value })),
}));
