import type { SubCategoryFilter } from "../../../types/typeFilters";
import { architectureAndManufacturedFilters } from "./subCategoryFilters/architectureAndManufacturedFilters";
import { atmosphereFilters } from "./subCategoryFilters/atmosphereFilters";
import { cartoonsAnimeAndComicsFilters } from "./subCategoryFilters/cartoonsAnimeAndComics";
import { colorsCrystalsSparklesAndLightFilters } from "./subCategoryFilters/colorsCrystalsSparklesAndLight";
import { moodBasedThemesFilters } from "./subCategoryFilters/moodBasedThemes";
import { musicStylesFilters } from "./subCategoryFilters/musicStyles";
import { otherThemesFilters } from "./subCategoryFilters/otherThemes";
import { realismAbstractionFilters } from "./subCategoryFilters/realismAbstractionFilters";
import { retroModernFilters } from "./subCategoryFilters/retroModernFilters";
import { roomsFilters } from "./subCategoryFilters/roomsFilters";
import { sciFiFilters } from "./subCategoryFilters/sciFiFilters";

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
  {
    id: "7",
    icon: "🎭🎵",
    name: "Music Styles",
    options: musicStylesFilters,
  },
  {
    id: "8",
    icon: "🎭📺",
    name: "Cartoons, Anime and Comics",
    options: cartoonsAnimeAndComicsFilters,
  },
  {
    id: "9",
    icon: "🎭🎆",
    name: "Colors, Crystals, Sparkles and Light",
    options: colorsCrystalsSparklesAndLightFilters,
  },
  {
    id: "10",
    icon: "🎭😁",
    name: "Mood Based Themes",
    options: moodBasedThemesFilters,
  },
  {
    id: "11",
    icon: "🎭⛩",
    name: "Other Themes",
    options: otherThemesFilters,
  },
];
