import type { driver } from "driver.js";
import { create } from "zustand";

type DriverInstance = ReturnType<typeof driver>;

type TourState = {
  driverJs: DriverInstance | null;
  isTourActive: boolean;
};

type TourActions = {
  setDriverJs: (value: DriverInstance | null) => void;
  setIsTourActive: (value: boolean) => void;
};

export const useTourStore = create<TourState & TourActions>((set) => ({
  driverJs: null,
  isTourActive: false,
  setDriverJs: (value) =>
    set((state) => (state.isTourActive ? { driverJs: value } : state)),
  setIsTourActive: (value) => set(() => ({ isTourActive: value })),
}));
