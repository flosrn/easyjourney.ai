import type { SubCategoryFilter } from "../typeFilters";
import { basicColorsFilters } from "./subCategories/basicColors";
import { chromaticPalettesFilters } from "./subCategories/chromaticPalettes";
import { colorBasedDesignsFilters } from "./subCategories/colorBasedDesigns";
import { colorModelsFilters } from "./subCategories/colorModels";
import { colorMotionPictureFilmSystemsFilters } from "./subCategories/colorMotionPictureFilmSystems";
import { contrastFilters } from "./subCategories/contrast";
import { darkVariationsFilters } from "./subCategories/darkVariations";
import { extendedColorsFilters } from "./subCategories/extendedColors";
import { lightVariationsFilters } from "./subCategories/lightVariations";
import { monochromaticPalettesFilters } from "./subCategories/monochromaticPalettes";
import { vividVariationsFilters } from "./subCategories/vividVariations";

export const colorsAndPalettesFilters: SubCategoryFilter[] = [
  {
    id: "basicColors_2",
    icon: "🎨",
    name: "BasicColors",
    options: basicColorsFilters,
  },
  {
    id: "extendedColors_3",
    icon: "🎨",
    name: "ExtendedColors",
    options: extendedColorsFilters,
  },
  {
    id: "darkVariations_4",
    icon: "🎨",
    name: "DarkVariations",
    options: darkVariationsFilters,
  },
  {
    id: "lightVariations_5",
    icon: "🎨",
    name: "LightVariations",
    options: lightVariationsFilters,
  },
  {
    id: "vividVariations_6",
    icon: "🎨",
    name: "VividVariations",
    options: vividVariationsFilters,
  },
  {
    id: "colorBasedDesigns_7",
    icon: "🎨",
    name: "ColorBasedDesigns",
    options: colorBasedDesignsFilters,
  },
  {
    id: "chromaticPalettes_8",
    icon: "🎨",
    name: "ChromaticPalettes",
    options: chromaticPalettesFilters,
  },
  {
    id: "monochromaticPalettes_9",
    icon: "🎨",
    name: "MonochromaticPalettes",
    options: monochromaticPalettesFilters,
  },
  {
    id: "contrast_10",
    icon: "🎨",
    name: "Contrast",
    options: contrastFilters,
  },
  {
    id: "colorModels_11",
    icon: "🎨",
    name: "ColorModels",
    options: colorModelsFilters,
  },
  {
    id: "colorMotionPictureFilmSystems_12",
    icon: "🎨",
    name: "ColorMotionPictureFilmSystems",
    options: colorMotionPictureFilmSystemsFilters,
  },
];
