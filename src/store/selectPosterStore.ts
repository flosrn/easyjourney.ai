import { create } from "zustand";

type PosterState = {
  selectedPosters: string[];
  toRemove: string[];
};

type PosterAction = {
  addPoster: (poster: string) => void;
  removePoster: (poster: string) => void;
  addToRemoveFromBoard: (poster: string) => void;
  removeFromRemoveFromBoard: (poster: string) => void;
  clearSelectedPosters: () => void;
  clearToRemoveFromBoard: () => void;
};

export const useSelectPosterStore = create<PosterAction & PosterState>(
  (set) => ({
    selectedPosters: [],
    toRemove: [],
    addPoster: (poster) => {
      set((state) => ({
        selectedPosters: [...state.selectedPosters, poster],
      }));
    },
    removePoster: (poster) => {
      set((state) => ({
        selectedPosters: state.selectedPosters.filter(
          (selectedPoster) => selectedPoster !== poster
        ),
      }));
    },
    addToRemoveFromBoard: (poster) => {
      set((state) => ({
        toRemove: [...state.toRemove, poster],
      }));
    },
    removeFromRemoveFromBoard: (poster) => {
      set((state) => ({
        toRemove: state.toRemove.filter(
          (removePoster) => removePoster !== poster
        ),
      }));
    },
    clearSelectedPosters: () => set(() => ({ selectedPosters: [] })),
    clearToRemoveFromBoard: () => set(() => ({ toRemove: [] })),
  })
);
