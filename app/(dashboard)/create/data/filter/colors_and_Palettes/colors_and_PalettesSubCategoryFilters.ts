import type { SubCategoryFilter } from "../../../types/typeFilters";
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
    icon: "🎨🔴 ",
    name: "Basic Colors",
    options: basicColorsFilters,
  },
  {
    id: "extendedColors_3",
    icon: "🎨🔵",
    name: "Extended Colors",
    options: extendedColorsFilters,
  },
  {
    id: "darkVariations_4",
    icon: "🎨⚫ ",
    name: "Dark Variations",
    options: darkVariationsFilters,
  },
  {
    id: "lightVariations_5",
    icon: "🎨⚪",
    name: "Light Variations",
    options: lightVariationsFilters,
  },
  {
    id: "vividVariations_6",
    icon: "🎨🔶",
    name: "Vivid Variations",
    options: vividVariationsFilters,
  },
  {
    id: "colorBasedDesigns_7",
    icon: "🎨",
    name: "Color Based Designs",
    options: colorBasedDesignsFilters,
  },
  {
    id: "chromaticPalettes_8",
    icon: "🎨🖌",
    name: "Chromatic Palettes",
    options: chromaticPalettesFilters,
  },
  {
    id: "monochromaticPalettes_9",
    icon: "🎨🖌",
    name: "Monochromatic Palettes",
    options: monochromaticPalettesFilters,
  },
  {
    id: "contrast_10",
    icon: "🎨🔲",
    name: "Contrast",
    options: contrastFilters,
  },
  {
    id: "colorModels_11",
    icon: "🎨🖥",
    name: "Color Models",
    options: colorModelsFilters,
  },
  {
    id: "colorMotionPictureFilmSystems_12",
    icon: "🎨🎥",
    name: "Color Motion Picture Film Systems",
    options: colorMotionPictureFilmSystemsFilters,
  },
];
