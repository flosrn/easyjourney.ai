import type { SubCategoryFilter } from "../typeFilters";
import { architectureAndManufacturedFilters } from "./architectureAndManufacturedFilters";
import { atmosphereFilters } from "./atmosphereFilters";
import { cartoonsAnimeAndComicsFilters } from "./cartoonsAnimeAndComics";
import { colorsCrystalsSparklesAndLightFilters } from "./colorsCrystalsSparklesAndLight";
import { moodBasedThemesFilters } from "./moodBasedThemes";
import { musicStylesFilters } from "./musicStyles";
import { otherThemesFilters } from "./otherThemes";
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
