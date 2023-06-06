import { create } from "zustand";

type TileState = {
  tileValue: boolean;
  disabledTileSelector: boolean;
};

type TileAction = {
  setTileValue: (state: boolean) => void;
  setDisabledTileSelector: (state: boolean) => void;
  toggleTileValue: () => void;
  resetTileValue: () => void;
};

export const useTileStore = create<TileAction & TileState>()((set) => ({
  tileValue: false,
  disabledTileSelector: false,
  setTileValue: (value) => set(() => ({ tileValue: value })),
  setDisabledTileSelector: (value) =>
    set(() => ({ disabledTileSelector: value })),
  toggleTileValue: () => set((state) => ({ tileValue: !state.tileValue })),
  resetTileValue: () => set({ tileValue: false }),
}));
