import { create } from "zustand";

type ColumnState = {
  showRightColumn: boolean;
};

type ColumnAction = {
  setShowRightColumn: (value: boolean) => void;
};

export const useColumnStore = create<ColumnAction & ColumnState>()((set) => ({
  showRightColumn: false,
  setShowRightColumn: (value) => set(() => ({ showRightColumn: value })),
}));
