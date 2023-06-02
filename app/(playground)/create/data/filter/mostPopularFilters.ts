import type { Filter } from "../../types/typeFilters";

export const mostPopularFilters: Filter[] = [
  {
    id: "1",
    name: "Cinematic",
    description:
      "A visually striking and dramatic style often found in movies and film photography.",
    style: "Cinematic",
    image: "/images/create/styles/camera/Cinematic.png",
    isSelected: false,
  },
  {
    id: "2",
    name: "Golden Hour",
    description:
      "A warm and vibrant art style that mimics the look of golden hour photography.",
    style: "Golden Hour",
    image: "/images/create/styles/camera/Golden_Hour.png",
    isSelected: false,
  },
  {
    id: "3",
    name: "Portrait",
    description:
      "A soft and subtle art style that focuses on the subject's face and expression.",
    style: "Portrait",
    image: "/images/create/styles/camera/Portrait.png",
    isSelected: false,
  },
  {
    id: "4",
    name: "Action Scene",
    description:
      "A dynamic and energetic art style that mimics the look of action scenes in movies.",
    style: "Action Scene",
    image: "/images/create/styles/camera/Action_Scene.png",
    isSelected: false,
  },
  {
    id: "5",
    name: "Product Shot",
    description:
      "A clean and professional art style that mimics the look of product photography.",
    style: "Product Photography",
    image: "/images/create/styles/camera/Product_Photography.png",
    isSelected: false,
  },
  {
    id: "6",
    name: "Film Noir Style",
    description:
      "A dark and moody art style that mimics the look of film noir photography.",
    style: "Film Noir Style",
    image: "/images/create/styles/camera/Film_Noir_Style.png",
    isSelected: false,
  },
];
