import { create } from "zustand";

import { subCategories } from "../data/subCategories";
import { type Filter, type SubCategoryFilter } from "../types/typeFilters";

type FilterState = {
  subCategories: SubCategoryFilter[];
  selectedFilters: Filter[];
  peekedSubCategory: SubCategoryFilter | null;
  peekedFilter: Filter | null;
};

type FilterAction = {
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  setPeekedSubCategory: (subCategory: SubCategoryFilter | null) => void;
  setPeekedFilter: (filter: Filter | null) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterAction & FilterState>()((set) => ({
  subCategories,
  selectedFilters: [],
  addFilter: (filter) => {
    set((state) => ({
      selectedFilters: [
        { ...filter, isSelected: true },
        ...state.selectedFilters,
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
  peekedSubCategory: null,
  peekedFilter: null,
  setPeekedSubCategory: (subCategory) =>
    set(() => ({ peekedSubCategory: subCategory })),
  setPeekedFilter: (filter) => set(() => ({ peekedFilter: filter })),
  clearFilters: () => set(() => ({ selectedFilters: [] })),
}));
