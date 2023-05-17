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
    icon: "🎭⛱",
    name: "Realism and Abstraction",
    options: realismAbstractionFilters,
  },
  {
    id: "2",
    icon: "🎭💾",
    name: "Retro and Modern",
    options: retroModernFilters,
  },
  {
    id: "3",
    icon: "🎭🪐",
    name: "Sci-fi",
    options: sciFiFilters,
  },
  {
    id: "4",
    icon: "🎭🌅 ",
    name: "Atmosphere",
    options: atmosphereFilters,
  },
  {
    id: "5",
    icon: "🎭🛋",
    name: "Rooms",
    options: roomsFilters,
  },
  {
    id: "6",
    icon: "🎭⚙",
    name: "Architecture and Manufactured",
    options: architectureAndManufacturedFilters,
  },
];
