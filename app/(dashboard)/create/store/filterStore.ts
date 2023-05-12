import { create } from "zustand";

import { styleFilters, type StyleFilter } from "../data/styleFilters";

type FilterState = {
  filters: StyleFilter[];
  selectedFilters: StyleFilter[];
  peekedFilter: StyleFilter;
};

type FilterAction = {
  addFilter: (filter: StyleFilter) => void;
  removeFilter: (filter: StyleFilter) => void;
  setPeekedFilter: (filter: StyleFilter) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterAction & FilterState>()((set) => ({
  filters: styleFilters,
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
  peekedFilter: styleFilters[0],
  setPeekedFilter: (filter) => set(() => ({ peekedFilter: filter })),
  clearFilters: () => set(() => ({ selectedFilters: [] })),
}));
