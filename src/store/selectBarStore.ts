import { create } from "zustand";

type SelectBarState = {
  isSelectBarOpen: boolean;
};

type SelectBarAction = {
  toggleSelectBar: () => void;
};

export const useSelectBarStore = create<SelectBarAction & SelectBarState>()(
  (set) => ({
    isSelectBarOpen: false,
    toggleSelectBar: () =>
      set((state) => ({ isSelectBarOpen: !state.isSelectBarOpen })),
  })
);
