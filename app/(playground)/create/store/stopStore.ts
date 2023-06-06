import { create } from "zustand";

type StopState = {
  stopValue: string;
  disabledStopSelector: boolean;
};

type StopAction = {
  setStopValue: (value: string) => void;
  setDisabledStopSelector: (value: boolean) => void;
};

export const useStopStore = create<StopAction & StopState>()((set) => ({
  stopValue: "100",
  disabledStopSelector: false,
  setStopValue: (value) => set(() => ({ stopValue: value })),
  setDisabledStopSelector: (value) =>
    set(() => ({ disabledStopSelector: value })),
}));
