import type { SubCategoryFilter } from "../../../types/typeFilters";
import { blackHolesandSingularitiesFilters } from "./subCategories/blackHolesandSingularities";
import { galaxiesNebulaeandOtherCosmicStructuresFilters } from "./subCategories/galaxiesNebulaeandOtherCosmicStructures";
import { otherFilters } from "./subCategories/other";
import { planetaryBodiesFilters } from "./subCategories/planetaryBodies";
import { solarPhenomenaFilters } from "./subCategories/solarPhenomena";
import { starsFilters } from "./subCategories/stars";
import { typesofMatterFilters } from "./subCategories/typesofMatter";

export const outerSpaceFilters: SubCategoryFilter[] = [
  {
    id: "galaxiesNebulaeandOtherCosmicStructures_1",
    icon: "☄🌌",
    name: "Galaxies, Nebulae and Other Cosmic Structures",
    options: galaxiesNebulaeandOtherCosmicStructuresFilters,
  },
  {
    id: "blackHolesandSingularities_2",
    icon: "☄⚫",
    name: "Black Holes and Singularities",
    options: blackHolesandSingularitiesFilters,
  },
  {
    id: "planetaryBodies_3",
    icon: "☄🌎",
    name: "Planetary Bodies",
    options: planetaryBodiesFilters,
  },
  {
    id: "stars_4",
    icon: "☄🌟",
    name: "Stars",
    options: starsFilters,
  },
  {
    id: "typesofMatter_5",
    icon: "☄⚛",
    name: "Types of Matter",
    options: typesofMatterFilters,
  },
  {
    id: "solarPhenomena_6",
    icon: "☄🌘",
    name: "Solar Phenomena",
    options: solarPhenomenaFilters,
  },
  {
    id: "other_7",
    icon: "☄",
    name: "Other",
    options: otherFilters,
  },
];
