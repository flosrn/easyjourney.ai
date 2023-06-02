import { create } from "zustand";

type StopState = {
  stopValue: string;
};

type StopAction = {
  setStopValue: (value: string) => void;
};

export const useStopStore = create<StopAction & StopState>()((set) => ({
  stopValue: "100",
  setStopValue: (value) => set(() => ({ stopValue: value })),
}));
