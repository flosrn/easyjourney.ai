import type { SubCategoryFilter } from "../typeFilters";
import { computerDataFilters } from "./subCategories/computerData";
import { conceptsFilters } from "./subCategories/concepts";
import { emotionsAndQualitiesFilters } from "./subCategories/emotionsandQualities";
import { lettersFilters } from "./subCategories/letters";
import { numberSystemsFilters } from "./subCategories/numberSystems";
import { numbersFilters } from "./subCategories/numbers";
import { otherSymbolsFilters } from "./subCategories/otherSymbols";
import { sizeFilters } from "./subCategories/size";
import { strengthandDurabilityFilters } from "./subCategories/strengthandDurability";
import { timeFilters } from "./subCategories/time";
import { tuplesFilters } from "./subCategories/tuples";
import { unicodeSymbolsFilters } from "./subCategories/unicodeSymbols";
import { visualPerceptionandDistortionsFilters } from "./subCategories/visualPerceptionandDistortions";
import { zodiacSignsFilters } from "./subCategories/zodiacSigns";

export const intangiblesFilters: SubCategoryFilter[] = [
  {
    id: "emotionsandQualities_1",
    icon: "➰😁",
    name: "Emotions and Qualities",
    options: emotionsAndQualitiesFilters,
  },
  {
    id: "concepts_2",
    icon: "➰🧠",
    name: "Concepts",
    options: conceptsFilters,
  },
  {
    id: "strengthandDurability_3",
    icon: "➰🏋️‍♂️",
    name: "Strength and Durability",
    options: strengthandDurabilityFilters,
  },
  {
    id: "size_4",
    icon: "➰🤏",
    name: "Size",
    options: sizeFilters,
  },
  {
    id: "letters_6",
    icon: "➰🔠",
    name: "Letters",
    options: lettersFilters,
  },
  {
    id: "numbers_7",
    icon: "➰🔢",
    name: "Numbers",
    options: numbersFilters,
  },
  {
    id: "unicodeSymbols_8",
    icon: "➰🔣",
    name: "Unicode Symbols",
    options: unicodeSymbolsFilters,
  },
  {
    id: "zodiacSigns_10",
    icon: "➰♓",
    name: "Zodiac Signs",
    options: zodiacSignsFilters,
  },
  {
    id: "otherSymbols_11",
    icon: "➰☯",
    name: "Other Symbols",
    options: otherSymbolsFilters,
  },
  {
    id: "visualPerceptionandDistortions_12",
    icon: "➰👁",
    name: "Visual Perception and Distortions",
    options: visualPerceptionandDistortionsFilters,
  },
  {
    id: "numbers_14",
    icon: "➰🔢",
    name: "Big Numbers",
    options: numbersFilters,
  },
  {
    id: "numberSystems_15",
    icon: "➰🔢",
    name: "Number Systems",
    options: numberSystemsFilters,
  },
  {
    id: "tuples_16",
    icon: "➰🔢",
    name: "Tuples",
    options: tuplesFilters,
  },
  {
    id: "time_17",
    icon: "➰🕒",
    name: "Time",
    options: timeFilters,
  },
  {
    id: "computerData_18",
    icon: "➰🖥",
    name: "Computer Data",
    options: computerDataFilters,
  },
];
