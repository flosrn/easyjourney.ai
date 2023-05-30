import type { Filter } from "../../../../types/typeFilters";

export const cutawayViewandCrossSectionsFilters: Filter[] = [
  {
    id: "Cross-Section_4_3_1",
    name: "Cross-Section",
    description: "Shows the internal structure of an object or scene.",
    style: "Cross-Section",
    image: "/images/filters/Cross-Section.webp",
    isSelected: false,
  },
  {
    id: "Cutaway_4_9_1",
    name: "Cutaway",
    description:
      "Reveals the interior details while keeping the exterior intact.",
    style: "Cutaway",
    image: "/images/filters/Cutaway.webp",
    isSelected: false,
  },
  {
    id: "Cutaway-View_4_9_2",
    name: "Cutaway-View",
    description: "Provides a visual of the object with a removed section.",
    style: "Cutaway-View",
    image: "/images/filters/Cutaway-View.webp",
    isSelected: false,
  },
  {
    id: "Cutaway Drawing_4_9_3",
    name: "Cutaway Drawing",
    description: "Illustrates the internal details using a technical drawing.",
    style: "Cutaway Drawing",
    image: "/images/filters/Cutaway_Drawing.webp",
    isSelected: false,
  },
  {
    id: "Exploded-View_4_15_1",
    name: "Exploded-View",
    description: "Shows the components of an object in separated layers.",
    style: "Exploded-View",
    image: "/images/filters/Exploded-View.webp",
    isSelected: false,
  },
  {
    id: "Exploded-View Drawing_4_15_2",
    name: "Exploded-View Drawing",
    description: "Illustrates the exploded view using a technical drawing.",
    style: "Exploded-View Drawing",
    image: "/images/filters/Exploded-View_Drawing.webp",
    isSelected: false,
  },
];
