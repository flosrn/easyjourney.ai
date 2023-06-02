import type { Filter } from "../../../../types/typeFilters";

export const contrastFilters: Filter[] = [
  {
    id: "Contrast_10_3_1",
    name: "Contrast",
    description: "Enhance the difference between light and dark elements",
    style: "Contrast",
    image: "/images/filters/Contrast.webp",
    isSelected: false,
  },
  {
    id: "High Contrast_10_9_1",
    name: "High Contrast",
    description: "Create a dramatic visual impact with strong contrast",
    style: "High Contrast",
    image: "/images/filters/High_Contrast.webp",
    isSelected: false,
  },
  {
    id: "Low Contrast_10_9_2",
    name: "Low Contrast",
    description: "Achieve a subtle and softer look with reduced contrast",
    style: "Low Contrast",
    image: "/images/filters/Low_Contrast.webp",
    isSelected: false,
  },
];
