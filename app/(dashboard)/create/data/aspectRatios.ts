export type AspectRatio = {
  name: string;
  ratio: string;
};

export const aspectRatios: AspectRatio[] = [
  { name: "Square", ratio: "" },
  { name: "Portrait 4:5", ratio: "--ar 4:5" },
  { name: "Portrait 2:3", ratio: "--ar 2:3" },
  { name: "Portrait 4:7", ratio: "--ar 4:7" },
  { name: "Landscape 5:4", ratio: "--ar 5:4" },
  { name: "Landscape 3:2", ratio: "--ar 3:2" },
  { name: "Landscape 7:4", ratio: "--ar 7:4" },
];
