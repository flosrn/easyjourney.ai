import { create } from "zustand";

// eslint-disable-next-line no-shadow
export enum DisplayMode {
  "STACK" = "stack",
  "GRID" = "grid",
}

type DisplayState = {
  displayMode: DisplayMode;
};

type DisplayAction = {
  setDisplayMode: (value: DisplayMode) => void;
};

export const useDisplayStore = create<DisplayAction & DisplayState>()(
  (set) => ({
    displayMode: DisplayMode.STACK,
    setDisplayMode: (value) => set(() => ({ displayMode: value })),
  })
);
