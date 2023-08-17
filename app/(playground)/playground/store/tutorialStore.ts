import type { driver } from "driver.js";
import { create } from "zustand";

type DriverInstance = ReturnType<typeof driver>;

type TutorialState = {
  driverJs: DriverInstance | null;
  isTutorialEnabled: boolean;
};

type TutorialActions = {
  setDriverJs: (value: DriverInstance | null) => void;
  setIsTutorialEnabled: (value: boolean) => void;
  moveNextTutorialStep: ({
    elDestination,
    timeout,
  }: {
    elDestination?: string;
    timeout?: number;
  }) => void;
};

export const useTutorialStore = create<TutorialState & TutorialActions>(
  (set) => ({
    driverJs: null,
    isTutorialEnabled: false,
    setDriverJs: (value) =>
      set((state) => (state.isTutorialEnabled ? { driverJs: value } : state)),
    setIsTutorialEnabled: (value) => set(() => ({ isTutorialEnabled: value })),
    moveNextTutorialStep: ({ elDestination, timeout }) =>
      set((state) => {
        const { driverJs, isTutorialEnabled } = state;
        if (!isTutorialEnabled) return state;
        if (!elDestination) driverJs?.moveNext();
        if (elDestination) {
          timeout && driverJs?.destroy();
          const tourSteps = driverJs?.getConfig().steps;
          const stepIndex = tourSteps?.findIndex(
            (tourStep) => tourStep.element === elDestination
          );
          setTimeout(() => {
            driverJs?.drive(stepIndex);
          }, timeout);
        }
        return state;
      }),
  })
);
