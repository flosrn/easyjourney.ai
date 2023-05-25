import type { Filter } from "../../../../types/typeFilters";

export const opacityFilters: Filter[] = [
  {
    id: "Opacity_1_3_1",
    name: "Opacity",
    description:
      "Degree of transparency or translucency of an object or substance.",
    style: "Opacity",
    image: "/images/filters/Opacity.webp",
    isSelected: false,
  },
  {
    id: "Transparent_1_9_1",
    name: "Transparent",
    description: "Clear and see-through, allowing light to pass through.",
    style: "Transparent",
    image: "/images/filters/Transparent.webp",
    isSelected: false,
  },
  {
    id: "Translucent_1_9_2",
    name: "Translucent",
    description:
      "Allowing light to pass through, resulting in a hazy appearance.",
    style: "Translucent",
    image: "/images/filters/Translucent.webp",
    isSelected: false,
  },
  {
    id: "Opaque_1_9_3",
    name: "Opaque",
    description:
      "Not allowing light to pass through, blocking visibility completely.",
    style: "Opaque",
    image: "/images/filters/Opaque.webp",
    isSelected: false,
  },
];
