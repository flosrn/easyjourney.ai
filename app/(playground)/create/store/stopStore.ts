import { create } from "zustand";

type StopState = {
  stopValue: number;
  disabledStopSelector: boolean;
};

type StopAction = {
  setStopValue: (value: number) => void;
  setDisabledStopSelector: (value: boolean) => void;
};

export const useStopStore = create<StopAction & StopState>()((set) => ({
  stopValue: 100,
  disabledStopSelector: false,
  setStopValue: (value) => set(() => ({ stopValue: value })),
  setDisabledStopSelector: (value) =>
    set(() => ({ disabledStopSelector: value })),
}));
