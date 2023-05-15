import type { CategoryFilter } from "./typeFilters";
import { themesSubCategoryFilters } from "./themes/themesSubCategoryFilters";

export const categoryFilters: CategoryFilter[] = [

  {
    id: "1",
    name: "Themes",
    options: themesSubCategoryFilters,
  },
];
