import { create } from "zustand";

type ModalSelectState = {
  isModalSelectOpen: boolean;
};

type ModalSelectAction = {
  toggleModalSelectOpen: () => void;
};

export const useModalSelectStore = create<
  ModalSelectAction & ModalSelectState
>()((set) => ({
  isModalSelectOpen: false,
  toggleModalSelectOpen: () =>
    set((state) => ({ isModalSelectOpen: !state.isModalSelectOpen })),
}));
