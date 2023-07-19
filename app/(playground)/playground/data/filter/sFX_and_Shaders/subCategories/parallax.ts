import type { Filter } from "../../../../types/typeFilters";

export const parallaxFilters: Filter[] = [
  {
    id: "Parallax_3_3_1",
    name: "Parallax",
    description: "Add a parallax effect to create depth and dimension.",
    style: "Parallax",
    image: "/images/filters/Parallax.webp",
    isSelected: false,
  },
  {
    id: "Anaglyph_3_9_1",
    name: "Anaglyph",
    description: "Create a stereoscopic 3D effect using anaglyph colors.",
    style: "Anaglyph",
    image: "/images/filters/Anaglyph.webp",
    isSelected: false,
  },
  {
    id: "Multiscopy_3_15_1",
    name: "Multiscopy",
    description: "Duplicate and layer multiple copies of your image.",
    style: "Multiscopy",
    image: "/images/filters/Multiscopy.webp",
    isSelected: false,
  },
  {
    id: "Autostereoscopy_3_15_2",
    name: "Autostereoscopy",
    description: "Generate a 3D effect without the need for special glasses.",
    style: "Autostereoscopy",
    image: "/images/filters/Autostereoscopy.webp",
    isSelected: false,
  },
  {
    id: "Stereoscopy_3_15_3",
    name: "Stereoscopy",
    description: "Create a sense of depth using binocular disparity.",
    style: "Stereoscopy",
    image: "/images/filters/Stereoscopy.webp",
    isSelected: false,
  },
];
