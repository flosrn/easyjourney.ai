export const getTwAspectRatio = (ratio: string) => {
  return {
    "aspect-[1/1]": ratio === "1/1",
    "aspect-[4/7] w-auto h-full": ratio === "4/7",
    "aspect-[2/3] w-auto h-full": ratio === "2/3",
    "aspect-[4/5] w-auto h-full": ratio === "4/5",
    "aspect-[5/4]": ratio === "5/4",
    "aspect-[4/3]": ratio === "4/3",
    "aspect-[3/2]": ratio === "3/2",
    "aspect-[16/10]": ratio === "16/10",
    "aspect-[7/4]": ratio === "7/4",
    "aspect-[16/9]": ratio === "16/9",
    "aspect-[17/9]": ratio === "17/9",
    "aspect-[21/9]": ratio === "21/9",
    "aspect-[32/9]": ratio === "32/9",
    "aspect-[4/1]": ratio === "4/1",
    "aspect-[1/2] w-auto h-full": ratio === "1/2",
    "aspect-[2/1]": ratio === "2/1",
    "aspect-[4/5]": ratio === "4/5",
    "aspect-[2/3]": ratio === "2/3",
    "aspect-[9/16]": ratio === "9/16",
  };
};
