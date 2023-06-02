import type { SubCategoryFilter } from "../../../types/typeFilters";
import { chromismFilters } from "./subCategories/chromism";
import { luminescenceFilters } from "./subCategories/luminescence";
import { opacityFilters } from "./subCategories/opacity";
import { opticsandLightManipulationFilters } from "./subCategories/opticsandLightManipulation";
import { otherMaterialPropertiesFilters } from "./subCategories/otherMaterialProperties";
import { phaseTransitionsFilters } from "./subCategories/phaseTransitions";
import { physicalPropertiesFilters } from "./subCategories/physicalProperties";
import { reflectionandRefractionFilters } from "./subCategories/reflectionandRefraction";
import { softnessandHardnessFilters } from "./subCategories/softnessandHardness";
import { textureMapsFilters } from "./subCategories/textureMaps";
import { thicknessFilters } from "./subCategories/thickness";

export const materialPropertiesFilters: SubCategoryFilter[] = [
  {
    id: "opacity_1",
    icon: "📦🧫",
    name: "Opacity",
    options: opacityFilters,
  },
  {
    id: "opticsandLightManipulation_2",
    icon: "📦🏮",
    name: "Optics and Light Manipulation",
    options: opticsandLightManipulationFilters,
  },
  {
    id: "luminescence_3",
    icon: "📦💡",
    name: "Luminescence",
    options: luminescenceFilters,
  },
  {
    id: "chromism_4",
    icon: "📦🌈",
    name: "Chromism",
    options: chromismFilters,
  },
  {
    id: "reflectionandRefraction_5",
    icon: "📦🔍",
    name: "Reflection and Refraction",
    options: reflectionandRefractionFilters,
  },
  {
    id: "phaseTransitions_6",
    icon: "📦❄",
    name: "Phase Transitions",
    options: phaseTransitionsFilters,
  },
  {
    id: "textureMaps_7",
    icon: "📦🗺",
    name: "Texture Maps",
    options: textureMapsFilters,
  },
  {
    id: "softnessandHardness_8",
    icon: "📦🧊",
    name: "Softness and Hardness",
    options: softnessandHardnessFilters,
  },
  {
    id: "thickness_9",
    icon: "📦🥞",
    name: "Thickness",
    options: thicknessFilters,
  },
  {
    id: "physicalProperties_10",
    icon: "📦🧽",
    name: "Physical Properties",
    options: physicalPropertiesFilters,
  },
  {
    id: "otherMaterialProperties_11",
    icon: "📦",
    name: "Other Material Properties",
    options: otherMaterialPropertiesFilters,
  },
];
