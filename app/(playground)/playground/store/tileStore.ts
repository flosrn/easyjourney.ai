import { create } from "zustand";

type TileState = {
  tileValue: boolean;
  isTileSelectorDisabled: boolean;
};

type TileAction = {
  setTileValue: (state: boolean) => void;
  setIsTileSelectorDisabled: (state: boolean) => void;
  toggleTileValue: () => void;
  resetTileValue: () => void;
};

export const useTileStore = create<TileAction & TileState>()((set) => ({
  tileValue: false,
  isTileSelectorDisabled: false,
  setTileValue: (value) => set(() => ({ tileValue: value })),
  setIsTileSelectorDisabled: (value) =>
    set(() => ({ isTileSelectorDisabled: value })),
  toggleTileValue: () => set((state) => ({ tileValue: !state.tileValue })),
  resetTileValue: () => set({ tileValue: false }),
}));
