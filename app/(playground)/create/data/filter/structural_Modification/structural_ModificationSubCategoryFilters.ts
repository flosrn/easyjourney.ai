import type { SubCategoryFilter } from "../../../types/typeFilters";
import { curvesandWavesFilters } from "./subCategories/CurvesandWaves";
import { circularFilters } from "./subCategories/circular";
import { dullandPointyFilters } from "./subCategories/dullandPointy";
import { knotsFilters } from "./subCategories/knots";
import { otherFilters } from "./subCategories/other";
import { spiralsLoopsandHelixesFilters } from "./subCategories/spiralsLoopsandHelixes";

export const structuralModificationFilters: SubCategoryFilter[] = [
  {
    id: "spiralsLoopsandHelixes_1",
    icon: "♻➰",
    name: "Spirals, Loops and Helixes",
    options: spiralsLoopsandHelixesFilters,
  },
  {
    id: "〰CurvesandWaves_2",
    icon: "♻〰 ",
    name: "Curves and Waves",
    options: curvesandWavesFilters,
  },
  {
    id: "knots_3",
    icon: "♻🕸",
    name: "Knots",
    options: knotsFilters,
  },
  {
    id: "circular_4",
    icon: "♻⭕",
    name: "Circular",
    options: circularFilters,
  },
  {
    id: "dullandPointy_5",
    icon: "♻🗡️",
    name: "Dull and Pointy",
    options: dullandPointyFilters,
  },
  {
    id: "other_6",
    icon: "♻",
    name: "Other",
    options: otherFilters,
  },
];
