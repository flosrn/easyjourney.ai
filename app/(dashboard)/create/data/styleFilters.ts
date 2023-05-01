export type StyleFilter = {
  id: string;
  name: string;
  description: string;
  style: string;
  image: string;
};

export const styleFilters: StyleFilter[] = [
  {
    id: "0",
    name: "None",
    description:
      "A simple and clean design style that doesn't use any special effects.",
    style: "",
    image: "/images/none.jpg",
  },
  {
    id: "1",
    name: "Cinematic",
    description:
      "A visually striking and dramatic style often found in movies and film photography.",
    style: "Cinematic",
    image: "/images/cinematic.jpg",
  },
  {
    id: "2",
    name: "Illustration",
    description:
      "A hand-drawn or digitally created artistic style that resembles illustrations in books and magazines.",
    style: "Illustration",
    image: "/images/illustration.jpg",
  },
  {
    id: "3",
    name: "Pop Art",
    description:
      "A colorful and bold art style inspired by popular culture, advertising, and mass media.",
    style: "Pop Art",
    image: "/images/popart.jpg",
  },
  {
    id: "4",
    name: "Minimalist",
    description:
      "A clean and simple design style that focuses on essential elements and minimal detail.",
    style: "Minimalist",
    image: "/images/minimalist.jpg",
  },
  {
    id: "5",
    name: "Watercolor",
    description:
      "A soft and fluid art style that mimics the look of traditional watercolor painting.",
    style: "Watercolor",
    image: "/images/watercolor.jpg",
  },
  {
    id: "6",
    name: "Pixel Art",
    description:
      "A digital art style that features pixel-like elements reminiscent of old-school video games.",
    style: "Pixel Art",
    image: "/images/pixelart.jpg",
  },
  {
    id: "7",
    name: "Sketch",
    description:
      "A rough and unrefined art style that resembles hand-drawn sketches and doodles.",
    style: "Sketch",
    image: "/images/sketch.jpg",
  },
];
