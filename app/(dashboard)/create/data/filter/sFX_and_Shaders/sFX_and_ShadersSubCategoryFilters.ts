import type { SubCategoryFilter } from "../typeFilters";
import { blursFilters } from "./subCategories/blurs";
import { chromaticSFXFilters } from "./subCategories/chromaticSFX";
import { distortionFilters } from "./subCategories/distortion";
import { parallaxFilters } from "./subCategories/parallax";
import { reflectionsFilters } from "./subCategories/reflections";
import { shadersandPostProcessingFilters } from "./subCategories/shadersandPostProcessing";
import { stylizedFilters } from "./subCategories/stylized";

export const sfxAndShadersFilters: SubCategoryFilter[] = [
  {
    id: "reflections_1",
    icon: "🌈",
    name: "Reflections",
    options: reflectionsFilters,
  },
  {
    id: "blurs_2",
    icon: "🌈",
    name: "Blurs",
    options: blursFilters,
  },
  {
    id: "parallax_3",
    icon: "🌈",
    name: "Parallax",
    options: parallaxFilters,
  },
  {
    id: "distortion_4",
    icon: "🌈",
    name: "Distortion",
    options: distortionFilters,
  },
  {
    id: "chromaticSFX_5",
    icon: "🌈",
    name: "ChromaticSFX",
    options: chromaticSFXFilters,
  },
  {
    id: "stylized_6",
    icon: "🌈",
    name: "Stylized",
    options: stylizedFilters,
  },
  {
    id: "shadersandPostProcessing_7",
    icon: "🌈",
    name: "ShadersandPostProcessing",
    options: shadersandPostProcessingFilters,
  },
];
