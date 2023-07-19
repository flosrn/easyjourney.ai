import { create } from "zustand";

type StopState = {
  stopValue: number;
  isStopSelectorDisabled: boolean;
};

type StopAction = {
  setStopValue: (value: number) => void;
  setIsStopSelectorDisabled: (value: boolean) => void;
};

export const useStopStore = create<StopAction & StopState>()((set) => ({
  stopValue: 100,
  isStopSelectorDisabled: false,
  setStopValue: (value) => set(() => ({ stopValue: value })),
  setIsStopSelectorDisabled: (value) =>
    set(() => ({ isStopSelectorDisabled: value })),
}));
