import type { Filter } from "../../../../types/typeFilters";

export const globalIlluminationFilters: Filter[] = [
  {
    id: "Global Illumination_6_3_1",
    name: "Global Illumination",
    description: "Enhances overall lighting for a more realistic appearance.",
    style: "Global Illumination",
    image: "/images/filters/Global_Illumination.webp",
    isSelected: false,
  },
  {
    id: "Lumen Global Illumination_6_3_2",
    name: "Lumen Global Illumination",
    description:
      "Provides advanced lighting effects with dynamic global illumination.",
    style: "Lumen Global Illumination",
    image: "/images/filters/Lumen_Global_Illumination.webp",
    isSelected: false,
  },
  {
    id: "Screen Space Global Illumination_6_3_3",
    name: "Screen Space Global Illumination",
    description: "Simulates global illumination using screen-space techniques.",
    style: "Screen Space Global Illumination",
    image: "/images/filters/Screen_Space_Global_Illumination.webp",
    isSelected: false,
  },
  {
    id: "Ray Tracing Global Illumination_6_9_1",
    name: "Ray Tracing Global Illumination",
    description:
      "Achieves realistic lighting effects through ray tracing algorithms.",
    style: "Ray Tracing Global Illumination",
    image: "/images/filters/Ray_Tracing_Global_Illumination.webp",
    isSelected: false,
  },
  {
    id: "Photon-Mapping_6_15_1",
    name: "Photon-Mapping",
    description:
      "Utilizes photon mapping techniques for accurate global illumination.",
    style: "Photon-Mapping",
    image: "/images/filters/Photon-Mapping.webp",
    isSelected: false,
  },
];
