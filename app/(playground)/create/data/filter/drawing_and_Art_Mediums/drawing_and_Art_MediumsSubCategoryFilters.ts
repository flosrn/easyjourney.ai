import type { SubCategoryFilter } from "../../../types/typeFilters";
import { blockPrintingFilters } from "./subCategories/blockPrinting";
import { booksandPostersFilters } from "./subCategories/booksandPosters";
import { cardsandStampsFilters } from "./subCategories/cardsandStamps";
import { carvingEtchingandModelingFilters } from "./subCategories/carvingEtchingandModeling";
import { crayonChalkandPastelFilters } from "./subCategories/crayonChalkandPastel";
import { drawingTypesFilters } from "./subCategories/drawingTypes";
import { framedBannerandDecalFilters } from "./subCategories/framedBannerandDecal";
import { inkFilters } from "./subCategories/ink";
import { lightFilters } from "./subCategories/light";
import { mosaicFilters } from "./subCategories/mosaic";
import { origamiFilters } from "./subCategories/origami";
import { otherFilters } from "./subCategories/other";
import { otherPhysicalMediumsFilters } from "./subCategories/otherPhysicalMediums";
import { paintTypesFilters } from "./subCategories/paintTypes";
import { paintingTypesFilters } from "./subCategories/paintingTypes";
import { pencilandGraphiteFilters } from "./subCategories/pencilandGraphite";
import { potteryandGlassFilters } from "./subCategories/potteryandGlass";
import { printTypesFilters } from "./subCategories/printTypes";
import { scrapbookingandCollagesFilters } from "./subCategories/scrapbookingandCollages";
import { textFilters } from "./subCategories/text";

export const drawingAndArtMediumsFilters: SubCategoryFilter[] = [
  {
    id: "drawingTypes_2",
    icon: "✏🖼",
    name: "Drawing Types",
    options: drawingTypesFilters,
  },
  {
    id: "pencilandGraphite_3",
    icon: "✏",
    name: "Pencil and Graphite",
    options: pencilandGraphiteFilters,
  },
  {
    id: "ink_4",
    icon: "✏🖊",
    name: "Ink",
    options: inkFilters,
  },
  {
    id: "crayonChalkandPastel_5",
    icon: "✏🖍",
    name: "Crayon, Chalk and Pastel",
    options: crayonChalkandPastelFilters,
  },
  {
    id: "paintingTypes_7",
    icon: "🎨🖼 ",
    name: "Painting Types",
    options: paintingTypesFilters,
  },
  {
    id: "paintTypes_8",
    icon: "🎨",
    name: "Paint Types",
    options: paintTypesFilters,
  },
  {
    id: "text_9",
    icon: "🖌🔠",
    name: "Text",
    options: textFilters,
  },
  {
    id: "printTypes_11",
    icon: "🖨📄 ",
    name: "Print Types",
    options: printTypesFilters,
  },
  {
    id: "blockPrinting_12",
    icon: "🖨🟫",
    name: "Block Printing",
    options: blockPrintingFilters,
  },
  {
    id: "cardsandStamps_13",
    icon: "🖨🃏",
    name: "Cards and Stamps",
    options: cardsandStampsFilters,
  },
  {
    id: "booksandPosters_14",
    icon: "🖨📚",
    name: "Books and Posters",
    options: booksandPostersFilters,
  },
  {
    id: "origami_16",
    icon: "🎲📄",
    name: "Origami",
    options: origamiFilters,
  },
  {
    id: "mosaic_17",
    icon: "🎲🀣",
    name: "Mosaic",
    options: mosaicFilters,
  },
  {
    id: "framedBannerandDecal_18",
    icon: "🎲🖼 ",
    name: "Framed, Banner and Decal",
    options: framedBannerandDecalFilters,
  },
  {
    id: "carvingEtchingandModeling_19",
    icon: "🎲🗿",
    name: "Carving, Etching and Modeling",
    options: carvingEtchingandModelingFilters,
  },
  {
    id: "potteryandGlass_20",
    icon: "🎲🏺",
    name: "Pottery and Glass",
    options: potteryandGlassFilters,
  },
  {
    id: "scrapbookingandCollages_21",
    icon: "🎲🏮",
    name: "Scrapbooking and Collages",
    options: scrapbookingandCollagesFilters,
  },
  {
    id: "light_22",
    icon: "🎲💡",
    name: "Light",
    options: lightFilters,
  },
  {
    id: "otherPhysicalMediums_23",
    icon: "🎲",
    name: "Other Physical Mediums",
    options: otherPhysicalMediumsFilters,
  },
  {
    id: "other_24",
    icon: "🖌",
    name: "Other",
    options: otherFilters,
  },
];
