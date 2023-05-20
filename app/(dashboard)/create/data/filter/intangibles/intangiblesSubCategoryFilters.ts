import type { SubCategoryFilter } from "../typeFilters";
import { computerDataFilters } from "./subCategories/computerData";
import { conceptsFilters } from "./subCategories/concepts";
import { emotionsandQualitiesFilters } from "./subCategories/emotionsandQualities";
import { lettersFilters } from "./subCategories/letters";
import { numberSystemsFilters } from "./subCategories/numberSystems";
import { numbersFilters } from "./subCategories/numbers";
import { otherSymbolsFilters } from "./subCategories/otherSymbols";
import { sizeFilters } from "./subCategories/size";
import { strengthandDurabilityFilters } from "./subCategories/strengthandDurability";
import { symbolsZodiacSignsOtherSymbolsFilters } from "./subCategories/symbolsZodiacSignsOtherSymbols";
import { timeFilters } from "./subCategories/time";
import { tuplesFilters } from "./subCategories/tuples";
import { unicodeSymbolsFilters } from "./subCategories/unicodeSymbols";
import { visualPerceptionandDistortionsFilters } from "./subCategories/visualPerceptionandDistortions";
import { zodiacSignsFilters } from "./subCategories/zodiacSigns";

export const intangiblesFilters: SubCategoryFilter[] = [
  {
    id: "emotionsandQualities_1",
    icon: "➰",
    name: "EmotionsandQualities",
    options: emotionsandQualitiesFilters,
  },
  {
    id: "concepts_2",
    icon: "➰",
    name: "Concepts",
    options: conceptsFilters,
  },
  {
    id: "strengthandDurability_3",
    icon: "➰",
    name: "StrengthandDurability",
    options: strengthandDurabilityFilters,
  },
  {
    id: "size_4",
    icon: "➰",
    name: "Size",
    options: sizeFilters,
  },
  {
    id: "letters_6",
    icon: "🔠",
    name: "Letters",
    options: lettersFilters,
  },
  {
    id: "numbers_7",
    icon: "🔢",
    name: "Numbers",
    options: numbersFilters,
  },
  {
    id: "unicodeSymbols_8",
    icon: "🔣",
    name: "UnicodeSymbols",
    options: unicodeSymbolsFilters,
  },
  {
    id: "symbolsZodiacSignsOtherSymbols_9",
    icon: "➰",
    name: "SymbolsZodiacSignsOtherSymbols",
    options: symbolsZodiacSignsOtherSymbolsFilters,
  },
  {
    id: "zodiacSigns_10",
    icon: "☯",
    name: "ZodiacSigns",
    options: zodiacSignsFilters,
  },
  {
    id: "otherSymbols_11",
    icon: "☯",
    name: "OtherSymbols",
    options: otherSymbolsFilters,
  },
  {
    id: "visualPerceptionandDistortions_12",
    icon: "➰",
    name: "VisualPerceptionandDistortions",
    options: visualPerceptionandDistortionsFilters,
  },
  {
    id: "numbers_14",
    icon: "🔢",
    name: "Numbers",
    options: numbersFilters,
  },
  {
    id: "numberSystems_15",
    icon: "🔢",
    name: "NumberSystems",
    options: numberSystemsFilters,
  },
  {
    id: "tuples_16",
    icon: "🔢",
    name: "Tuples",
    options: tuplesFilters,
  },
  {
    id: "time_17",
    icon: "➰",
    name: "Time",
    options: timeFilters,
  },
  {
    id: "computerData_18",
    icon: "➰",
    name: "ComputerData",
    options: computerDataFilters,
  },
];
