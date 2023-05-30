import type { Filter } from "../../../../types/typeFilters";

export const textureMapsFilters: Filter[] = [
  {
    id: "Bump Map_7_3_1",
    name: "Bump Map",
    description:
      "Simulate surface bumps or irregularities using grayscale textures.",
    style: "Bump Map",
    image: "/images/filters/Bump_Map.webp",
    isSelected: false,
  },
  {
    id: "Bump Mapped_7_3_2",
    name: "Bump Mapped",
    description: "Apply a bump map to add depth and texture to surfaces.",
    style: "Bump Mapped",
    image: "/images/filters/Bump_Mapped.webp",
    isSelected: false,
  },
  {
    id: "Bump Mapping_7_3_3",
    name: "Bump Mapping",
    description: "Utilize bump maps to create realistic surface details.",
    style: "Bump Mapping",
    image: "/images/filters/Bump_Mapping.webp",
    isSelected: false,
  },
  {
    id: "Normal Map_7_9_1",
    name: "Normal Map",
    description: "Create surface normals for realistic lighting and shading.",
    style: "Normal Map",
    image: "/images/filters/Normal_Map.webp",
    isSelected: false,
  },
  {
    id: "Depth Map_7_9_2",
    name: "Depth Map",
    description: "Use grayscale maps to add depth and dimension to surfaces.",
    style: "Depth Map",
    image: "/images/filters/Depth_Map.webp",
    isSelected: false,
  },
  {
    id: "Displacement Map_7_9_3",
    name: "Displacement Map",
    description:
      "Displace vertices based on grayscale maps for detailed surfaces.",
    style: "Displacement Map",
    image: "/images/filters/Displacement_Map.webp",
    isSelected: false,
  },
];
