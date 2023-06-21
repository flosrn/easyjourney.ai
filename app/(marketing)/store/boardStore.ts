import { create } from "zustand";

type BoardState = {
  boardName: string;
  boardSlug: string;
  boardIcon?: string;
  boardDescription?: string;
  boardIsPublic: boolean;
  originalState?: Partial<BoardState>;
};

type BoardAction = {
  setBoardName: (value: string) => void;
  setBoardSlug: (value: string) => void;
  setBoardIsPublic: (value: boolean) => void;
  setBoardIcon: (value: string) => void;
  setBoardDescription: (value: string) => void;
  setBoardForm: (name: string, value: boolean | string) => void;
  saveOriginalState: () => void;
  restoreOriginalState: () => void;
};

export const useBoardStore = create<BoardAction & BoardState>()((set) => ({
  boardName: "",
  boardSlug: "",
  boardIsPublic: false,
  setBoardName: (value) => set(() => ({ boardName: value })),
  setBoardSlug: (value) => set(() => ({ boardSlug: value })),
  setBoardIcon: (value) => set(() => ({ boardIcon: value })),
  setBoardDescription: (value) => set(() => ({ boardDescription: value })),
  setBoardIsPublic: (value) => set(() => ({ boardIsPublic: value })),
  setBoardForm: (name, value) => set(() => ({ [name]: value })),
  saveOriginalState: () => set((state) => ({ originalState: { ...state } })),
  restoreOriginalState: () => set((state) => state.originalState ?? {}),
}));
