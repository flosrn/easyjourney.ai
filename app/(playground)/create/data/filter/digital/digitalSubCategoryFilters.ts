import type { SubCategoryFilter } from "../../../types/typeFilters";
import { BitFilters } from ".//subCategoryFilters/1-Bit-16-Bit";
import { aIAndNeuralNetworksFilters } from "./subCategoryFilters/aIAndNeuralNetworks";
import { artProgramsAndApplicationsFilters } from "./subCategoryFilters/artProgramsAndApplications";
import { aspectRatiosAndLetterboxingFilters } from "./subCategoryFilters/aspectRatiosAndLetterboxing";
import { computerSystemGraphicsFilters } from "./subCategoryFilters/computerSystemGraphics";
import { digitalStylesFilters } from "./subCategoryFilters/digitalStyles";
import { ditheringFilters } from "./subCategoryFilters/dithering";
import { gameSystemGraphicsFilters } from "./subCategoryFilters/gameSystemGraphics";
import { gameSystemsFilters } from "./subCategoryFilters/gameSystems";
import { GlitchyFilters } from "./subCategoryFilters/glitchy";
import { imageFormatsAndTypesFilters } from "./subCategoryFilters/imageFormatsAndTypes";
import { interpolationFilters } from "./subCategoryFilters/interpolation";
import { operatingSystemsFilters } from "./subCategoryFilters/operatingSystems";
import { otherFilters } from "./subCategoryFilters/other";
import { renderingEnginesFilters } from "./subCategoryFilters/renderingEngines";
import { resolutionFilters } from "./subCategoryFilters/resolution";
import { vFXAndVideoCompaniesFilters } from "./subCategoryFilters/vFXAndVideoCompanies";
import { videoGameCharactersFilters } from "./subCategoryFilters/videoGameCharacters";
import { videoGameStylesFilters } from "./subCategoryFilters/videoGamesStyle";
import { websitesFilters } from "./subCategoryFilters/websites";

export const digitalSubCategoryFilters: SubCategoryFilter[] = [
  {
    id: "1",
    icon: "🖥🎮",
    name: "Rendering Engines",
    options: renderingEnginesFilters,
  },
  {
    id: "2",
    icon: "🖥📐",
    name: "Resolution",
    options: resolutionFilters,
  },
  {
    id: "3",
    icon: "🖥📺",
    name: "Aspect Ratios and Letterboxing",
    options: aspectRatiosAndLetterboxingFilters,
  },
  {
    id: "4",
    icon: "🖥🟩",
    name: "1-bit 16-bit",
    options: BitFilters,
  },
  {
    id: "5",
    icon: "🖥🖼",
    name: "Digital Styles",
    options: digitalStylesFilters,
  },
  {
    id: "6",
    icon: "🖥🎞",
    name: "VFX and Video Companies",
    options: vFXAndVideoCompaniesFilters,
  },
  {
    id: "7",
    icon: "🖥🎨",
    name: "Art Programs and Applications",
    options: artProgramsAndApplicationsFilters,
  },
  {
    id: "8",
    icon: "🖥🖼",
    name: "Image Formats and Types",
    options: imageFormatsAndTypesFilters,
  },
  {
    id: "9",
    icon: "🖥🏁",
    name: "Dithering",
    options: ditheringFilters,
  },
  {
    id: "10",
    icon: "🖥🔘",
    name: "Interpolation",
    options: interpolationFilters,
  },
  {
    id: "11",
    icon: "🖥🌐",
    name: "Websites",
    options: websitesFilters,
  },
  {
    id: "12",
    icon: "🖥👩‍💻",
    name: "Glitchy",
    options: GlitchyFilters,
  },
  {
    id: "13",
    icon: "🖥🕹",
    name: "Video Games Style",
    options: videoGameStylesFilters,
  },
  {
    id: "14",
    icon: "🖥🤺",
    name: "Video Games Characters",
    options: videoGameCharactersFilters,
  },
  {
    id: "15",
    icon: "🖥👾",
    name: "Game System Graphics",
    options: gameSystemGraphicsFilters,
  },
  {
    id: "16",
    icon: "🖥🎮",
    name: "Game Systems",
    options: gameSystemsFilters,
  },
  {
    id: "17",
    icon: "🖥💾",
    name: "Computer System Graphics",
    options: computerSystemGraphicsFilters,
  },
  {
    id: "18",
    icon: "🖥💽",
    name: "Operating Systems",
    options: operatingSystemsFilters,
  },
  {
    id: "19",
    icon: "🖥🧠",
    name: "AI and Neural Networks",
    options: aIAndNeuralNetworksFilters,
  },
  {
    id: "20",
    icon: "🖥",
    name: "Other",
    options: otherFilters,
  },
];
