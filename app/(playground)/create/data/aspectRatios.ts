export type AspectRatio = {
  name: string;
  ratio: string;
  value: string;
};

export const aspectRatios: AspectRatio[] = [
  { name: "1:1", ratio: "", value: "1/1" },
  { name: "4:7", ratio: "--ar 4:7", value: "4/7" },
  { name: "2:3", ratio: "--ar 2:3", value: "2/3" },
  { name: "4:5", ratio: "--ar 4:5", value: "4/5" },
  { name: "5:4", ratio: "--ar 5:4", value: "5/4" },
  { name: "4:3", ratio: "--ar 4:3", value: "4/3" },
  { name: "3:2", ratio: "--ar 3:2", value: "3/2" },
  { name: "16:10", ratio: "--ar 16:10", value: "16/10" },
  { name: "7:4", ratio: "--ar 7:4", value: "7/4" },
  { name: "16:9", ratio: "--ar 16:9", value: "16/9" },
  { name: "17:9", ratio: "--ar 17:9", value: "17/9" },
  { name: "21:9", ratio: "--ar 21:9", value: "21/9" },
  { name: "32:9", ratio: "--ar 32:9", value: "32/9" },
  { name: "4:1", ratio: "--ar 4:1", value: "4/1" },
];

export const aspectRatiosV4: AspectRatio[] = [
  { name: "2:1", ratio: "--ar 2:1", value: "2/1" },
  { name: "1:2", ratio: "--ar 1:2", value: "1/2" },
];
