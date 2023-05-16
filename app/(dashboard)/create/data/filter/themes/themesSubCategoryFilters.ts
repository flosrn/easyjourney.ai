import type { SubCategoryFilter } from "../typeFilters";
import { architectureAndManufacturedFilters } from "./architectureAndManufacturedFilters";
import { atmosphereFilters } from "./atmosphereFilters";
import { realismAbstractionFilters } from "./realismAbstractionFilters";
import { retroModernFilters } from "./retroModernFilters";
import { roomsFilters } from "./roomsFilters";
import { sciFiFilters } from "./sciFiFilters";

export const themesSubCategoryFilters: SubCategoryFilter[] = [
  {
    id: "1",
    icone: "🎭⛱",
    name: "Realism/Abstraction",
    options: realismAbstractionFilters,
  },
  {
    id: "2",
    icone: "🎭💾",
    name: "Retro/Modern",
    options: retroModernFilters,
  },
  {
    id: "3",
    icone: "🎭🪐",
    name: "Sci-fi",
    options: sciFiFilters,
  },
  {
    id: "4",
    icone: "🎭🌅 ",
    name: "Atmosphere",
    options: atmosphereFilters,
  },
  {
    id: "5",
    icone: "🎭🛋",
    name: "Rooms",
    options: roomsFilters,
  },
  {
    id: "6",
    icone: "🎭⚙",
    name: "Architecture and Manufactured",
    options: architectureAndManufacturedFilters,
  },
];
