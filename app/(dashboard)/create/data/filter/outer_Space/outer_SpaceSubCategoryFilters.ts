import type { SubCategoryFilter } from "../typeFilters";
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
    icon: "☄",
    name: "Galaxies,Nebulae,andOtherCosmicStructures",
    options: galaxiesNebulaeandOtherCosmicStructuresFilters,
  },
  {
    id: "blackHolesandSingularities_2",
    icon: "☄",
    name: "BlackHolesandSingularities",
    options: blackHolesandSingularitiesFilters,
  },
  {
    id: "planetaryBodies_3",
    icon: "☄",
    name: "PlanetaryBodies",
    options: planetaryBodiesFilters,
  },
  {
    id: "stars_4",
    icon: "☄",
    name: "Stars",
    options: starsFilters,
  },
  {
    id: "typesofMatter_5",
    icon: "☄",
    name: "TypesofMatter",
    options: typesofMatterFilters,
  },
  {
    id: "solarPhenomena_6",
    icon: "☄",
    name: "SolarPhenomena",
    options: solarPhenomenaFilters,
  },
  {
    id: "other_7",
    icon: "☄",
    name: "Other",
    options: otherFilters,
  },
];
