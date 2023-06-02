import type { SubCategoryFilter } from "../../../types/typeFilters";
import { countriesandNationsFilters } from "./subCategories/countriesandNations";
import { fictionalNonHumanCreaturesFilters } from "./subCategories/fictionalNonHumanCreatures";
import { holidaysFilters } from "./subCategories/holidays";
import { professionsandTypesofPeopleFilters } from "./subCategories/professionsandTypesofPeople";
import { sportsFilters } from "./subCategories/sports";
import { urbanRuralFilters } from "./subCategories/urbanRural";

export const geographyAndCultureFilters: SubCategoryFilter[] = [
  {
    id: "countriesandNations_1",
    icon: "🗺🎌",
    name: "Countries and Nations",
    options: countriesandNationsFilters,
  },
  {
    id: "urbanRural_2",
    icon: "🗺🌾",
    name: "Urban/Rural",
    options: urbanRuralFilters,
  },
  {
    id: "holidays_3",
    icon: "🗺🎄",
    name: "Holidays",
    options: holidaysFilters,
  },
  {
    id: "professionsandTypesofPeople_4",
    icon: "🗺🐱‍👤",
    name: "Professions and Types of People",
    options: professionsandTypesofPeopleFilters,
  },
  {
    id: "fictionalNonHumanCreatures_5",
    icon: "🗺🧜‍♀️",
    name: "Fictional Non-Human Creatures",
    options: fictionalNonHumanCreaturesFilters,
  },
  {
    id: "sports_6",
    icon: "🗺⚽",
    name: "Sports",
    options: sportsFilters,
  },
];
