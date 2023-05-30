import { create } from "zustand";

type SelectBarState = {
  isSelectBarOpen: boolean;
};

type SelectBarAction = {
  toggleSelectBar: () => void;
  closeSelectBar: () => void;
};

export const useSelectBarStore = create<SelectBarAction & SelectBarState>()(
  (set) => ({
    isSelectBarOpen: false,
    toggleSelectBar: () =>
      set((state) => ({ isSelectBarOpen: !state.isSelectBarOpen })),
    closeSelectBar: () => set({ isSelectBarOpen: false }),
  })
);
