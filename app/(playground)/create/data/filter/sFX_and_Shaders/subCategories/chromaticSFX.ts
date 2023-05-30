import type { Filter } from "../../../../types/typeFilters";

export const chromaticSFXFilters: Filter[] = [
  {
    id: "Chromatic Aberration_5_3_1",
    name: "Chromatic Aberration",
    description: "Introduce color fringing for a retro and glitchy effect.",
    style: "Chromatic Aberration",
    image: "/images/filters/Chromatic_Aberration.webp",
    isSelected: false,
  },
  {
    id: "RGB Displacement_5_3_2",
    name: "RGB Displacement",
    description: "Create a distorted and displaced RGB channel effect.",
    style: "RGB Displacement",
    image: "/images/filters/RGB_Displacement.webp",
    isSelected: false,
  },
  {
    id: "Spherical Aberration_5_3_3",
    name: "Spherical Aberration",
    description: "Simulate the optical effect of spherical lens aberration.",
    style: "Spherical Aberration",
    image: "/images/filters/Spherical_Aberration.webp",
    isSelected: false,
  },
  {
    id: "Harris Shutter_5_9_1",
    name: "Harris Shutter",
    description:
      "Create a tri-color separation effect inspired by the Harris Shutter technique.",
    style: "Harris Shutter",
    image: "/images/filters/Harris_Shutter.webp",
    isSelected: false,
  },
];
