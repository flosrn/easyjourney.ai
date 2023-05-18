import type { SubCategoryFilter } from "../typeFilters";
import { chartsAndDiagramsFilters } from "./chartsAndDiagrams";
import { cubismFilters } from "./cubism";
import { decadeStylesFilters } from "./decadeStyles";
import { eleganceBeautyAndAppealFilters } from "./eleganceBeautyAndAppeal";
import { expressionismFilters } from "./expressionism";
import { morphismFilters } from "./morphism";
import { neoFilters } from "./neo";
import { otherStylesFilters } from "./otherStyles";
import { patternsFilters } from "./patterns";
import { psychedelicDivineFractalAndNoiseFilters } from "./psychedelicDivineFractalAndNoise";
import { simplicityComplexityFilters } from "./simplicityComplexity";
import { stylizedFilters } from "./stylized";
import { synesthesiaFilters } from "./synesthesia";
import { ArtStylesFilters } from "./‍ArtStyles";

export const designStylesSubCategoryFilters: SubCategoryFilter[] = [
  {
    id: "1",
    icon: "🖼🟧",
    name: "Simplicity and Complexity",
    options: simplicityComplexityFilters,
  },
  {
    id: "2",
    icon: "🖼🎨",
    name: "Patterns",
    options: patternsFilters,
  },
  {
    id: "3",
    icon: "🖼✨",
    name: "Elegance, Beauty, and Appeal",
    options: eleganceBeautyAndAppealFilters,
  },
  {
    id: "4",
    icon: "🖼📊",
    name: "Charts and Diagrams",
    options: chartsAndDiagramsFilters,
  },
  {
    id: "5",
    icon: "🖼🛹",
    name: "Decade Styles",
    options: decadeStylesFilters,
  },
  {
    id: "6",
    icon: "🖼🎰",
    name: "Morphism",
    options: morphismFilters,
  },
  {
    id: "7",
    icon: "🖼🧊",
    name: "Cubism",
    options: cubismFilters,
  },
  {
    id: "8",
    icon: "🖼🦋",
    name: "Expressionism",
    options: expressionismFilters,
  },
  {
    id: "9",
    icon: "🖼🔮",
    name: "Neo",
    options: neoFilters,
  },
  {
    id: "10",
    icon: "🖼🌀",
    name: "Psychedelic, Divine, Fractal, and Noise",
    options: psychedelicDivineFractalAndNoiseFilters,
  },
  {
    id: "11",
    icon: "🖼🌈",
    name: "Synesthesia",
    options: synesthesiaFilters,
  },
  {
    id: "12",
    icon: "🖼👩‍🎨",
    name: "Art Styles",
    options: ArtStylesFilters,
  },
  {
    id: "13",
    icon: "🖼💫",
    name: "Stylized",
    options: stylizedFilters,
  },
  {
    id: "14",
    icon: "🖼",
    name: "Other Styles",
    options: otherStylesFilters,
  },
];
