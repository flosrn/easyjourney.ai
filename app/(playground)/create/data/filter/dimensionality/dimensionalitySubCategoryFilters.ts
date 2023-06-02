import type { SubCategoryFilter } from "../../../types/typeFilters";
import { D5DFilters } from "./subCategories/0D5D";
import { overdimensionalMultiverseetcFilters } from "./subCategories/overdimensionalMultiverseetc.";

export const dimensionalityFilters: SubCategoryFilter[] = [
  {
    id: "0D5D_1",
    icon: "🌌",
    name: "0D-5D",
    options: D5DFilters,
  },
  {
    id: "overdimensionalMultiverseetc._2",
    icon: "🌌",
    name: "Overdimensional, Multiverse, etc.",
    options: overdimensionalMultiverseetcFilters,
  },
];
