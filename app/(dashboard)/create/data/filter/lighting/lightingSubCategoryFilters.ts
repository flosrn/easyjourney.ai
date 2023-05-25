import type { SubCategoryFilter } from "../../../types/typeFilters";
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
    icon: "💡🔦",
    name: "Lighting Styles and Techniques",
    options: lightingStylesandTechniquesFilters,
  },
  {
    id: "typesofLights_2",
    icon: "💡🏮",
    name: "Types of Lights",
    options: typesofLightsFilters,
  },
  {
    id: "lampsandTubes_3",
    icon: "💡🪔",
    name: "Lamps and Tubes",
    options: lampsandTubesFilters,
  },
  {
    id: "typesofLasers_4",
    icon: "💡💥",
    name: "Types of Lasers",
    options: typesofLasersFilters,
  },
  {
    id: "typesofDisplays_5",
    icon: "💡📺",
    name: "Types of Displays",
    options: typesofDisplaysFilters,
  },
  {
    id: "globalIllumination_6",
    icon: "💡🌐",
    name: "Global Illumination",
    options: globalIlluminationFilters,
  },
  {
    id: "shadows_7",
    icon: "💡⚫",
    name: "Shadows",
    options: shadowsFilters,
  },
];
