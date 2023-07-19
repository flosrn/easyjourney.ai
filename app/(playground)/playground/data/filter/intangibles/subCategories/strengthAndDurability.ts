import type { Filter } from "../../../../types/typeFilters";

export const strengthAndDurabilityFilters: Filter[] = [
  {
    id: "Weak_3_3_1",
    name: "Weak",
    description: "Provides a subtle, softer touch",
    style: "Weak",
    image: "/images/filters/Weak.webp",
    isSelected: false,
  },
  {
    id: "Strong_3_3_2",
    name: "Strong",
    description: "Imparts bold and vivid impacts",
    style: "Strong",
    image: "/images/filters/Strong.webp",
    isSelected: false,
  },
  {
    id: "Durable_3_3_3",
    name: "Durable",
    description: "Offers a steady, long-lasting effect",
    style: "Durable",
    image: "/images/filters/Durable.webp",
    isSelected: false,
  },
  {
    id: "Powerful_3_9_1",
    name: "Powerful",
    description: "Gives a dynamic and intense alteration",
    style: "Powerful",
    image: "/images/filters/Powerful.webp",
    isSelected: false,
  },
];
