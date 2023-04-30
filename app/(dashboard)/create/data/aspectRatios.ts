export type AspectRatio = {
  name: string;
  ratio: string;
};

export const aspectRatios: AspectRatio[] = [
  { name: "Square", ratio: "1:1" },
  { name: "Portrait 4:5", ratio: "4:5" },
  { name: "Portrait 2:3", ratio: "2:3" },
  { name: "Portrait 4:7", ratio: "4:7" },
  { name: "Landscape 5:4", ratio: "5:4" },
  { name: "Landscape 3:2", ratio: "3:2" },
  { name: "Landscape 7:4", ratio: "7:4" },
];
