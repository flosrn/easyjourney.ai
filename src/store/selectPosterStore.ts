import { create } from "zustand";

type PosterState = {
  selectedPosters: string[];
};

type PosterAction = {
  addPoster: (poster: string) => void;
  removePoster: (poster: string) => void;
  clearSelectedPosters: () => void;
};

export const useSelectPosterStore = create<PosterAction & PosterState>()(
  (set) => ({
    selectedPosters: [],
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
    clearSelectedPosters: () => set(() => ({ selectedPosters: [] })),
  })
);
