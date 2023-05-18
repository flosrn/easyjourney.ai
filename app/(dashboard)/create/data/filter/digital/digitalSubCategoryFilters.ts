import type { SubCategoryFilter } from "../typeFilters";
import { BitFilters } from "./1-Bit-16-Bit";
import { aIAndNeuralNetworksFilters } from "./aIAndNeuralNetworks";
import { artProgramsAndApplicationsFilters } from "./artProgramsAndApplications";
import { aspectRatiosAndLetterboxingFilters } from "./aspectRatiosAndLetterboxing";
import { computerSystemGraphicsFilters } from "./computerSystemGraphics";
import { digitalStylesFilters } from "./digitalStyles";
import { ditheringFilters } from "./dithering";
import { gameSystemGraphicsFilters } from "./gameSystemGraphics";
import { gameSystemsFilters } from "./gameSystems";
import { imageFormatsAndTypesFilters } from "./imageFormatsAndTypes";
import { interpolationFilters } from "./interpolation";
import { operatingSystemsFilters } from "./operatingSystems";
import { otherFilters } from "./other";
import { renderingEnginesFilters } from "./renderingEngines";
import { resolutionFilters } from "./resolution";
import { vFXAndVideoCompaniesFilters } from "./vFXAndVideoCompanies";
import { videoGameCharactersFilters } from "./videoGameCharacters";
import { videoGameStylesFilters } from "./videoGamesStyle";
import { websitesFilters } from "./websites";
import { GlitchyFilters } from "./‍Glitchy";

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
