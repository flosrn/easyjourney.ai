import type { SubCategoryFilter } from "../typeFilters";
import { cameraSettingsFilters } from "./subCategories/cameraSettings";
import { cameraandFilmTypesFilters } from "./subCategories/cameraandFilmTypes";
import { cameraandScenesFilters } from "./subCategories/cameraandScenes";
import { filmSizesFilters } from "./subCategories/filmSizes";
import { focusandDepthofFieldFilters } from "./subCategories/focusandDepthofField";
import { lensFiltersFilters } from "./subCategories/lensFilters";
import { lensSizesFilters } from "./subCategories/lensSizes";
import { lensesFilters } from "./subCategories/lenses";
import { megapixelResolutionsFilters } from "./subCategories/megapixelResolutions";
import { otherFilters } from "./subCategories/other";
import { zoomPanandTiltFilters } from "./subCategories/zoomPanandTilt";

export const cameraFilters: SubCategoryFilter[] = [
  {
    id: "cameraandScenes_1",
    icon: "📷",
    name: "CameraandScenes",
    options: cameraandScenesFilters,
  },
  {
    id: "cameraandFilmTypes_2",
    icon: "📷",
    name: "CameraandFilmTypes",
    options: cameraandFilmTypesFilters,
  },
  {
    id: "filmSizes_3",
    icon: "📷",
    name: "FilmSizes",
    options: filmSizesFilters,
  },
  {
    id: "lensSizes_4",
    icon: "📷",
    name: "LensSizes",
    options: lensSizesFilters,
  },
  {
    id: "lenses_5",
    icon: "📷",
    name: "Lenses",
    options: lensesFilters,
  },
  {
    id: "lensFilters_6",
    icon: "📷",
    name: "LensFilters",
    options: lensFiltersFilters,
  },
  {
    id: "cameraSettings_7",
    icon: "📷",
    name: "CameraSettings(Aperture,Exposure,ColorandWhiteBalance,etc.)",
    options: cameraSettingsFilters,
  },
  {
    id: "focusandDepthofField_8",
    icon: "📷",
    name: "FocusandDepthofField",
    options: focusandDepthofFieldFilters,
  },
  {
    id: "zoomPanandTilt_9",
    icon: "📷",
    name: "Zoom,Pan,andTilt",
    options: zoomPanandTiltFilters,
  },
  {
    id: "megapixelResolutions_10",
    icon: "📷",
    name: "MegapixelResolutions",
    options: megapixelResolutionsFilters,
  },
  {
    id: "other_11",
    icon: "📷",
    name: "Other",
    options: otherFilters,
  },
];
