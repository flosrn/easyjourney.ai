import { create } from "zustand";

import { mostPopularFilters } from "../data/filter/mostPopularFilters";
import type { Filter } from "../data/filter/typeFilters";

type FilterState = {
  filters: Filter[];
  selectedFilters: Filter[];
  peekedFilter: Filter | null;
};

type FilterAction = {
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  setPeekedFilter: (filter: Filter | null) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterAction & FilterState>()((set) => ({
  filters: mostPopularFilters,
  selectedFilters: [],
  addFilter: (filter) => {
    set((state) => ({
      selectedFilters: [
        ...state.selectedFilters,
        { ...filter, isSelected: true },
      ],
    }));
  },
  removeFilter: (filter) => {
    set((state) => ({
      selectedFilters: state.selectedFilters.filter(
        (selectedFilter) => selectedFilter.id !== filter.id
      ),
    }));
  },
  peekedFilter: null,
  setPeekedFilter: (filter) => set(() => ({ peekedFilter: filter })),
  clearFilters: () => set(() => ({ selectedFilters: [] })),
}));
