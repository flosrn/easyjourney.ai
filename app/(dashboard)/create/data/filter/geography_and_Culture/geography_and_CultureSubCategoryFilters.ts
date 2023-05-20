import type { SubCategoryFilter } from "../typeFilters";
import { countriesandNationsFilters } from "./subCategories/countriesandNations";
import { fictionalNonHumanCreaturesFilters } from "./subCategories/fictionalNonHumanCreatures";
import { holidaysFilters } from "./subCategories/holidays";
import { professionsandTypesofPeopleFilters } from "./subCategories/professionsandTypesofPeople";
import { sportsFilters } from "./subCategories/sports";
import { urbanRuralFilters } from "./subCategories/urbanRural";

export const geographyAndCultureFilters: SubCategoryFilter[] = [
  {
    id: "countriesandNations_1",
    icon: "🗺",
    name: "CountriesandNations",
    options: countriesandNationsFilters,
  },
  {
    id: "urbanRural_2",
    icon: "🗺",
    name: "Urban/Rural",
    options: urbanRuralFilters,
  },
  {
    id: "holidays_3",
    icon: "🗺",
    name: "Holidays",
    options: holidaysFilters,
  },
  {
    id: "professionsandTypesofPeople_4",
    icon: "🗺",
    name: "ProfessionsandTypesofPeople",
    options: professionsandTypesofPeopleFilters,
  },
  {
    id: "fictionalNonHumanCreatures_5",
    icon: "🗺",
    name: "FictionalNon-HumanCreatures",
    options: fictionalNonHumanCreaturesFilters,
  },
  {
    id: "sports_6",
    icon: "🗺",
    name: "Sports",
    options: sportsFilters,
  },
];
