import { SubCategoryFilter } from "../typeFilters";
import { architectureAndManufacturedFilters } from "./architectureAndManufacturedFilters";
import { atmosphereFilters } from "./atmosphereFilters";
import { realismAbstractionFilters } from "./realismAbstractionFilters";
import { retroModernFilters } from "./retroModernFilters";
import { roomsFilters } from "./roomsFilters";
import { sciFiFilters } from "./sciFiFilters";


export const themesSubCategoryFilters: SubCategoryFilter[] = [
  {
    id: "1",
    name: "Realism/Abstraction",
    options: realismAbstractionFilters,
  },
  {
    id: "2",
    name: "Retro/Modern",
    options: retroModernFilters,
  },
  {
    id: "3",
    name: "Sci-fi",
    options: sciFiFilters,
  },
  {
    id: "4",
    name: "Atmosphere",
    options: atmosphereFilters,
  },
  {
    id: "5",
    name: "Rooms",
    options: roomsFilters,
  },
  {
    id: "6",
    name: "Architecture and Manufactured",
    options: architectureAndManufacturedFilters,
  },
];
