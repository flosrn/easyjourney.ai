import { create } from "zustand";

type TileState = {
  tileValue: boolean;
};

type TileAction = {
  toggleTileValue: () => void;
  resetTileValue: () => void;
};

export const useTileStore = create<TileAction & TileState>()((set) => ({
  tileValue: false,
  toggleTileValue: () => set((state) => ({ tileValue: !state.tileValue })),
  resetTileValue: () => set({ tileValue: false }),
}));
