import type { SubCategoryFilter } from "../typeFilters";
import { anglesFilters } from "./subCategories/angles";
import { cutawayViewandCrossSectionsFilters } from "./subCategories/cutawayViewandCrossSections";
import { perspectiveandProjectionsFilters } from "./subCategories/perspectiveandProjections";
import { viewsFilters } from "./subCategories/views";

export const perspectiveFilters: SubCategoryFilter[] = [
  {
    id: "views_1",
    icon: "🛤",
    name: "Views",
    options: viewsFilters,
  },
  {
    id: "angles_2",
    icon: "🛤",
    name: "Angles",
    options: anglesFilters,
  },
  {
    id: "perspectiveandProjections_3",
    icon: "🛤",
    name: "PerspectiveandProjections",
    options: perspectiveandProjectionsFilters,
  },
  {
    id: "cutawayViewandCrossSections_4",
    icon: "🛤",
    name: "CutawayViewandCross-Sections",
    options: cutawayViewandCrossSectionsFilters,
  },
];
