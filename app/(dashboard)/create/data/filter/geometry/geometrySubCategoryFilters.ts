import type { SubCategoryFilter } from "../typeFilters";
import { o2DShapesFilters } from "./subCategories/2DShapes";
import { o3DShapesFilters } from "./subCategories/3DShapes";
import { o4DHyperShapesFilters } from "./subCategories/4DHyperShapes";
import { degenerateShapesFilters } from "./subCategories/DegenerateShapes";
import { geometricPropertiesFilters } from "./subCategories/geometricProperties";
import { geometricStylesFilters } from "./subCategories/geometricStyles";
import { topologyStylesFilters } from "./subCategories/topologyStyles";

export const geometryFilters: SubCategoryFilter[] = [
  {
    id: "2DShapes_1",
    icon: "💠",
    name: "2DShapes",
    options: o2DShapesFilters,
  },
  {
    id: "3DShapes_2",
    icon: "💠",
    name: "3DShapes",
    options: o3DShapesFilters,
  },
  {
    id: "4DHyperShapes_3",
    icon: "💠",
    name: "4DHyperShapes",
    options: o4DHyperShapesFilters,
  },
  {
    id: "DegenerateShapes_4",
    icon: "💠",
    name: "DegenerateShapes",
    options: degenerateShapesFilters,
  },
  {
    id: "geometricStyles_5",
    icon: "💠",
    name: "GeometricStyles",
    options: geometricStylesFilters,
  },
  {
    id: "geometricProperties_6",
    icon: "💠",
    name: "GeometricProperties",
    options: geometricPropertiesFilters,
  },
  {
    id: "topologyStyles_7",
    icon: "💠",
    name: "TopologyStyles",
    options: topologyStylesFilters,
  },
];
