import { create } from "zustand";

type PosterState = {
  selectedPosters: string[];
  isSelectModalOpen: boolean;
};

type PosterAction = {
  addPoster: (poster: string) => void;
  removePoster: (poster: string) => void;
  clearSelectedPosters: () => void;
  toggleSelectPostersOpen: () => void;
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
    isSelectModalOpen: false,
    toggleSelectPostersOpen: () =>
      set((state) => ({ isSelectModalOpen: !state.isSelectModalOpen })),
  })
);
