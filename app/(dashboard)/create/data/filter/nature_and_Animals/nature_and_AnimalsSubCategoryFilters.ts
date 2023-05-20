import type { SubCategoryFilter } from "../typeFilters";
import { animalsFilters } from "./subCategories/animals";
import { biomesandLandscapesFilters } from "./subCategories/biomesandLandscapes";
import { coralsFilters } from "./subCategories/corals";
import { fungiFilters } from "./subCategories/fungi";
import { insectsFilters } from "./subCategories/insects";
import { natureFilters } from "./subCategories/nature";
import { plantsFilters } from "./subCategories/plants";
import { sealifeFilters } from "./subCategories/sealife";
import { seasonsandWeatherFilters } from "./subCategories/seasonsandWeather";
import { skyFilters } from "./subCategories/sky";
import { timeofDayFilters } from "./subCategories/timeofDay";

export const natureAndAnimalsFilters: SubCategoryFilter[] = [
  {
    id: "timeofDay_1",
    icon: "🌲",
    name: "TimeofDay",
    options: timeofDayFilters,
  },
  {
    id: "sky_2",
    icon: "🌲",
    name: "Sky",
    options: skyFilters,
  },
  {
    id: "biomesandLandscapes_3",
    icon: "🌲",
    name: "BiomesandLandscapes",
    options: biomesandLandscapesFilters,
  },
  {
    id: "nature_4",
    icon: "🌲",
    name: "Nature",
    options: natureFilters,
  },
  {
    id: "plants_5",
    icon: "🌲",
    name: "Plants",
    options: plantsFilters,
  },
  {
    id: "fungi_6",
    icon: "🌲",
    name: "Fungi",
    options: fungiFilters,
  },
  {
    id: "animals_7",
    icon: "🌲",
    name: "Animals",
    options: animalsFilters,
  },
  {
    id: "insects_8",
    icon: "🌲",
    name: "Insects",
    options: insectsFilters,
  },
  {
    id: "sealife_9",
    icon: "🌲",
    name: "Sealife",
    options: sealifeFilters,
  },
  {
    id: "corals_10",
    icon: "🌲",
    name: "Corals",
    options: coralsFilters,
  },
  {
    id: "seasonsandWeather_11",
    icon: "🌲",
    name: "SeasonsandWeather",
    options: seasonsandWeatherFilters,
  },
];
