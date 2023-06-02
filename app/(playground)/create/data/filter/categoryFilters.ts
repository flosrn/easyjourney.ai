import { artistsFilters } from "./artists/artistsSubCategoryFilters";
import { cameraFilters } from "./camera/cameraSubCategoryFilters";
import { colorsAndPalettesFilters } from "./colors_and_Palettes/colors_and_PalettesSubCategoryFilters";
import { designStylesSubCategoryFilters } from "./designStyles/designStylesSubCategoryFilters";
import { digitalSubCategoryFilters } from "./digital/digitalSubCategoryFilters";
import { dimensionalityFilters } from "./dimensionality/dimensionalitySubCategoryFilters";
import { drawingAndArtMediumsFilters } from "./drawing_and_Art_Mediums/drawing_and_Art_MediumsSubCategoryFilters";
import { geographyAndCultureFilters } from "./geography_and_Culture/geography_and_CultureSubCategoryFilters";
import { geometryFilters } from "./geometry/geometrySubCategoryFilters";
import { intangiblesFilters } from "./intangibles/intangiblesSubCategoryFilters";
import { lightingFilters } from "./lighting/lightingSubCategoryFilters";
import { materialPropertiesFilters } from "./material_Properties/material_PropertiesSubCategoryFilters";
import { materialsFilters } from "./materials/materialsSubCategoryFilters";
import { natureAndAnimalsFilters } from "./nature_and_Animals/nature_and_AnimalsSubCategoryFilters";
import { objectsFilters } from "./objects/objectsSubCategoryFilters";
import { outerSpaceFilters } from "./outer_Space/outer_SpaceSubCategoryFilters";
import { perspectiveFilters } from "./perspective/perspectiveSubCategoryFilters";
import { sfxAndShadersFilters } from "./sFX_and_Shaders/sFX_and_ShadersSubCategoryFilters";
import { structuralModificationFilters } from "./structural_Modification/structural_ModificationSubCategoryFilters";
import { tVAndMoviesFilters } from "./tV_and_Movies/tV_and_MoviesSubCategoryFilters";
import { themesSubCategoryFilters } from "./themes/themesSubCategoryFilters";
import type { CategoryFilter } from "../../types/typeFilters";

export const categoryFilters: CategoryFilter[] = [
  {
    id: "1",
    icon: "🎭",
    name: "Themes",
    options: themesSubCategoryFilters,
  },
  {
    id: "2",
    icon: "🖼",
    name: "Design Styles",
    options: designStylesSubCategoryFilters,
  },
  {
    id: "3",
    icon: "🖥",
    name: "Digital",
    options: digitalSubCategoryFilters,
  },
  {
    id: "4",
    icon: "📔",
    name: "Artists",
    options: artistsFilters,
  },
  {
    id: "5",
    icon: "🖌",
    name: "Drawing and Art Mediums",
    options: drawingAndArtMediumsFilters,
  },
  {
    id: "6",
    icon: "🎨",
    name: "Colors and Palettes",
    options: colorsAndPalettesFilters,
  },
  {
    id: "7",
    icon: "🧱",
    name: "Materials",
    options: materialsFilters,
  },
  {
    id: "8",
    icon: "🎷",
    name: "Objects and Foods",
    options: objectsFilters,
  },
  {
    id: "9",
    icon: "📦",
    name: "Material Properties",
    options: materialPropertiesFilters,
  },
  {
    id: "10",
    icon: "💡",
    name: "Lighting",
    options: lightingFilters,
  },
  {
    id: "11",
    icon: "🌈",
    name: "SFX and Shaders",
    options: sfxAndShadersFilters,
  },
  {
    id: "12",
    icon: "🌌",
    name: "Dimensionality",
    options: dimensionalityFilters,
  },
  {
    id: "13",
    icon: "🌲",
    name: "Nature and Animals",
    options: natureAndAnimalsFilters,
  },
  {
    id: "14",
    icon: "🗺",
    name: "Geography and Culture",
    options: geographyAndCultureFilters,
  },
  {
    id: "15",
    icon: "☄",
    name: "Outer Space",
    options: outerSpaceFilters,
  },
  {
    id: "16",
    icon: "📷",
    name: "Camera, Film and Lenses",
    options: cameraFilters,
  },
  {
    id: "17",
    icon: "🛤️",
    name: "Perspective",
    options: perspectiveFilters,
  },
  {
    id: "18",
    icon: "🎬",
    name: "TV Shows and Movies",
    options: tVAndMoviesFilters,
  },
  {
    id: "19",
    icon: "💠",
    name: "Geometry",
    options: geometryFilters,
  },
  {
    id: "20",
    icon: "♻",
    name: "Structural Modification",
    options: structuralModificationFilters,
  },
  {
    id: "21",
    icon: "➰",
    name: "Intangibles",
    options: intangiblesFilters,
  },
];
