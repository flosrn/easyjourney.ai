import { create } from "zustand";

type DialogState = {
  isDialogOpen: boolean;
};

type DialogAction = {
  toggleDialog: () => void;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export const useDialogStore = create<DialogAction & DialogState>()((set) => ({
  isDialogOpen: false,
  toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
  setIsDialogOpen: (isOpen) => set(() => ({ isDialogOpen: isOpen })),
}));
