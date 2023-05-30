import type { Filter } from "../../../../types/typeFilters";

export const interpolationFilters: Filter[] = [
  {
    id: "Interpolation_10_3_1",
    name: "Interpolation",
    description: "Filter for performing image interpolation.",
    style: "Interpolation",
    image: "/images/filters/Interpolation.webp",
    isSelected: false,
  },
  {
    id: "Bicubic Interpolation_10_3_2",
    name: "Bicubic Interpolation",
    description: "Filter for performing bicubic interpolation.",
    style: "Bicubic Interpolation",
    image: "/images/filters/Bicubic_Interpolation.webp",
    isSelected: false,
  },
  {
    id: "Bilinear Interpolation_10_3_3",
    name: "Bilinear Interpolation",
    description: "Filter for performing bilinear interpolation.",
    style: "Bilinear Interpolation",
    image: "/images/filters/Bilinear_Interpolation.webp",
    isSelected: false,
  },
];
