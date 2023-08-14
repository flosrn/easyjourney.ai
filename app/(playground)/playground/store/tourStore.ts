import wait from "~/utils/wait";
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
  moveNextTourStep: ({
    elDestination,
    timeout,
  }: {
    elDestination: string;
    timeout: number;
  }) => void;
};

export const useTourStore = create<TourState & TourActions>((set) => ({
  driverJs: null,
  isTourActive: false,
  setDriverJs: (value) =>
    set((state) => (state.isTourActive ? { driverJs: value } : state)),
  setIsTourActive: (value) => set(() => ({ isTourActive: value })),
  moveNextTourStep: ({ elDestination, timeout }) =>
    set((state) => {
      const { driverJs, isTourActive } = state;
      if (!isTourActive) return state;
      if (elDestination) {
        timeout && driverJs?.destroy();
        const tourSteps = driverJs?.getConfig().steps;
        const stepIndex = tourSteps?.findIndex(
          (tourStep) => tourStep.element === elDestination
        );
        setTimeout(() => {
          driverJs?.drive(stepIndex);
        }, timeout);
      } else {
        driverJs?.moveNext();
      }
      return state;
    }),
}));
