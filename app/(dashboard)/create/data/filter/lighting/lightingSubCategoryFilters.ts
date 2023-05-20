import type { SubCategoryFilter } from "../typeFilters";
import { globalIlluminationFilters } from "./subCategories/globalIllumination";
import { lampsandTubesFilters } from "./subCategories/lampsandTubes";
import { lightingStylesandTechniquesFilters } from "./subCategories/lightingStylesandTechniques";
import { shadowsFilters } from "./subCategories/shadows";
import { typesofDisplaysFilters } from "./subCategories/typesofDisplays";
import { typesofLasersFilters } from "./subCategories/typesofLasers";
import { typesofLightsFilters } from "./subCategories/typesofLights";

export const lightingFilters: SubCategoryFilter[] = [
  {
    id: "lightingStylesandTechniques_1",
    icon: "💡",
    name: "LightingStylesandTechniques",
    options: lightingStylesandTechniquesFilters,
  },
  {
    id: "typesofLights_2",
    icon: "💡",
    name: "TypesofLights",
    options: typesofLightsFilters,
  },
  {
    id: "lampsandTubes_3",
    icon: "💡",
    name: "LampsandTubes",
    options: lampsandTubesFilters,
  },
  {
    id: "typesofLasers_4",
    icon: "💡",
    name: "TypesofLasers",
    options: typesofLasersFilters,
  },
  {
    id: "typesofDisplays_5",
    icon: "💡",
    name: "TypesofDisplays",
    options: typesofDisplaysFilters,
  },
  {
    id: "globalIllumination_6",
    icon: "💡",
    name: "GlobalIllumination",
    options: globalIlluminationFilters,
  },
  {
    id: "shadows_7",
    icon: "💡",
    name: "Shadows",
    options: shadowsFilters,
  },
];
