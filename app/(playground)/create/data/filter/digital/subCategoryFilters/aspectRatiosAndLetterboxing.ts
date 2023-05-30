import type { Filter } from "../../../../types/typeFilters";

export const aspectRatiosAndLetterboxingFilters: Filter[] = [
  {
    id: "Fullscreen_3_3_1",
    name: "Fullscreen",
    description: "Aspect ratio: 4:3",
    style: "Fullscreen",
    image: "/images/filters/Fullscreen.webp",
    isSelected: false,
  },
  {
    id: "Widescreen_3_3_2",
    name: "Widescreen",
    description: "Aspect ratio: 16:9",
    style: "Widescreen",
    image: "/images/filters/Widescreen.webp",
    isSelected: false,
  },
  {
    id: "Anamorphic Widescreen_3_3_3",
    name: "Anamorphic Widescreen",
    description: "Aspect ratio: Anamorphic",
    style: "Anamorphic Widescreen",
    image: "/images/filters/Anamorphic_Widescreen.webp",
    isSelected: false,
  },
  {
    id: "Pillarbox_3_7_1",
    name: "Pillarbox",
    description: "Letterboxing with black bars on the sides",
    style: "Pillarbox",
    image: "/images/filters/Pillarbox.webp",
    isSelected: false,
  },
  {
    id: "Letterboxing_3_7_2",
    name: "Letterboxing",
    description: "Letterboxing with black bars on the top and bottom",
    style: "Letterboxing",
    image: "/images/filters/Letterboxing.webp",
    isSelected: false,
  },
  {
    id: "Windowbox_3_7_3",
    name: "Windowbox",
    description: "Letterboxing with black bars on all sides",
    style: "Windowbox",
    image: "/images/filters/Windowbox.webp",
    isSelected: false,
  },
];
