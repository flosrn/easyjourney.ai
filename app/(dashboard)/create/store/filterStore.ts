import { create } from "zustand";

import { styleFilters, type StyleFilter } from "../data/styleFilters";

type FilterState = {
  filters: StyleFilter[];
  selectedFilter: StyleFilter;
  peekedFilter: StyleFilter;
};

type FilterAction = {
  setSelectedFilter: (filter: StyleFilter) => void;
  setPeekedFilter: (filter: StyleFilter) => void;
};

export const useFilterStore = create<FilterAction & FilterState>()((set) => ({
  filters: styleFilters,
  selectedFilter: styleFilters[0],
  setSelectedFilter: (filter) => set(() => ({ selectedFilter: filter })),
  peekedFilter: styleFilters[0],
  setPeekedFilter: (filter) => set(() => ({ peekedFilter: filter })),
}));
