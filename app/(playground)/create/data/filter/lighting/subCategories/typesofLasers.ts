import type { Filter } from "../../../../types/typeFilters";

export const typesofLasersFilters: Filter[] = [
  {
    id: "Laser_4_3_1",
    name: "Laser",
    description: "Utilizes stimulated emission for focused and coherent light.",
    style: "Laser",
    image: "/images/filters/Laser.webp",
    isSelected: false,
  },
  {
    id: "Laser Light Show_4_3_2",
    name: "Laser Light Show",
    description: "Creates mesmerizing visual effects using laser beams.",
    style: "Laser Light Show",
    image: "/images/filters/Laser_Light_Show.webp",
    isSelected: false,
  },
  {
    id: "Dye-Laser_4_9_1",
    name: "Dye-Laser",
    description: "Uses dye solution as the gain medium for tunable output.",
    style: "Dye-Laser",
    image: "/images/filters/Dye-Laser.webp",
    isSelected: false,
  },
  {
    id: "Ion-Laser_4_9_2",
    name: "Ion-Laser",
    description: "Employs ionized gas as the gain medium for high power.",
    style: "Ion-Laser",
    image: "/images/filters/Ion-Laser.webp",
    isSelected: false,
  },
  {
    id: "Gas-Laser_4_9_3",
    name: "Gas-Laser",
    description:
      "Uses various gases as the gain medium for specific wavelengths.",
    style: "Gas-Laser",
    image: "/images/filters/Gas-Laser.webp",
    isSelected: false,
  },
];
