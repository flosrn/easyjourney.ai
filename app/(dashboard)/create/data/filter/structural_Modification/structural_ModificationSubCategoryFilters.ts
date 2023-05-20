import type { SubCategoryFilter } from "../typeFilters";
import { curvesandWavesFilters } from "./subCategories/CurvesandWaves";
import { circularFilters } from "./subCategories/circular";
import { dullandPointyFilters } from "./subCategories/dullandPointy";
import { knotsFilters } from "./subCategories/knots";
import { otherFilters } from "./subCategories/other";
import { spiralsLoopsandHelixesFilters } from "./subCategories/spiralsLoopsandHelixes";

export const structuralModificationFilters: SubCategoryFilter[] = [
  {
    id: "spiralsLoopsandHelixes_1",
    icon: "♻",
    name: "Spirals,Loops,andHelixes",
    options: spiralsLoopsandHelixesFilters,
  },
  {
    id: "〰CurvesandWaves_2",
    icon: "♻",
    name: "CurvesandWaves",
    options: curvesandWavesFilters,
  },
  {
    id: "knots_3",
    icon: "♻",
    name: "Knots",
    options: knotsFilters,
  },
  {
    id: "circular_4",
    icon: "♻",
    name: "Circular",
    options: circularFilters,
  },
  {
    id: "dullandPointy_5",
    icon: "♻",
    name: "DullandPointy",
    options: dullandPointyFilters,
  },
  {
    id: "other_6",
    icon: "♻",
    name: "Other",
    options: otherFilters,
  },
];
