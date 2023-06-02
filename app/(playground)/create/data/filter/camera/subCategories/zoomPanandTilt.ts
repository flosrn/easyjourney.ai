import type { Filter } from "../../../../types/typeFilters";

export const zoomPanandTiltFilters: Filter[] = [
  {
    id: "Zoom_9_3_1",
    name: "Zoom",
    description: "Adjusts the focal length to magnify or reduce the image.",
    style: "Zoom",
    image: "/images/filters/Zoom.webp",
    isSelected: false,
  },
  {
    id: "Dolly Zoom_9_3_2",
    name: "Dolly Zoom",
    description: "Simulates perspective distortion for dramatic effects.",
    style: "Dolly Zoom",
    image: "/images/filters/Dolly_Zoom.webp",
    isSelected: false,
  },
  {
    id: "Pan_9_9_1",
    name: "Pan",
    description: "Horizontally rotates the camera to capture a wide scene.",
    style: "Pan",
    image: "/images/filters/Pan.webp",
    isSelected: false,
  },
  {
    id: "Tilt_9_9_2",
    name: "Tilt",
    description: "Vertically tilts the camera to change the perspective.",
    style: "Tilt",
    image: "/images/filters/Tilt.webp",
    isSelected: false,
  },
  {
    id: "Tiltshift_9_15_1",
    name: "Tiltshift",
    description:
      "Creates a selective focus effect with a narrow depth of field.",
    style: "Tiltshift",
    image: "/images/filters/Tiltshift.webp",
    isSelected: false,
  },
];
