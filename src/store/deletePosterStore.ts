import { create } from "zustand";

type DeletePosterState = {
  selectedDeletePosters: string[];
};

type DeletePosterAction = {
  addDeletePoster: (DeletePoster: string) => void;
  removeDeletePoster: (DeletePoster: string) => void;
  clearDeletePosters: () => void;
};

export const useDeletePosterStore = create<
  DeletePosterAction & DeletePosterState
>()((set) => ({
  selectedDeletePosters: [],
  addDeletePoster: (deletePoster) => {
    set((state) => ({
      // add the new filter to the beginning of the array
      selectedDeletePosters: [deletePoster, ...state.selectedDeletePosters],
    }));
  },
  removeDeletePoster: (deletePoster) => {
    set((state) => ({
      selectedDeletePosters: state.selectedDeletePosters.filter(
        (selectedDeletePoster) => selectedDeletePoster !== deletePoster
      ),
    }));
  },
  clearDeletePosters: () => set(() => ({ selectedDeletePosters: [] })),
}));
