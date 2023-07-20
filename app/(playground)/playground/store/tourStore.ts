import type { driver } from "driver.js";
import { create } from "zustand";

type DriverInstance = ReturnType<typeof driver>;

type TourState = {
  driverObj: DriverInstance | null;
  isTourActive: boolean;
};

type TourActions = {
  setDriverObj: (value: DriverInstance | null) => void;
  setIsTourActive: (value: boolean) => void;
};

export const useTourStore = create<TourState & TourActions>((set) => ({
  driverObj: null,
  isTourActive: false,
  setDriverObj: (value) => set(() => ({ driverObj: value })),
  setIsTourActive: (value) => set(() => ({ isTourActive: value })),
}));
