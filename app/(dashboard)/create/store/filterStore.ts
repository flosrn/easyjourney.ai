import { create } from "zustand";

import { styleFilters, type StyleFilter } from "../data/styleFilters";

type FilterState = {
  filters: StyleFilter[];
  selectedFilters: StyleFilter[];
  peekedFilter: StyleFilter;
};

type FilterAction = {
  setSelectedFilters: (filter: StyleFilter[]) => void;
  setPeekedFilter: (filter: StyleFilter) => void;
};

export const useFilterStore = create<FilterAction & FilterState>()((set) => ({
  filters: styleFilters,
  selectedFilters: [styleFilters[0]],
  setSelectedFilters: (filters) => {
    set((state) => {
      const uniqueFilters = Array.from(new Set([...state.selectedFilters, ...filters]));
      return { selectedFilters: uniqueFilters };
    });
  },
  
  peekedFilter: styleFilters[0],
  setPeekedFilter: (filter) => set(() => ({ peekedFilter: filter })),
}));
