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
  setDriverJs: (value) => set(() => ({ driverJs: value })),
  setIsTourActive: (value) => set(() => ({ isTourActive: value })),
}));
