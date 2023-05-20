import type { SubCategoryFilter } from "../typeFilters";
import { clothFilters } from "./subCategories/cloth";
import { gassesandVaporsFilters } from "./subCategories/gassesandVapors";
import { gelatinousandSpongyFilters } from "./subCategories/gelatinousandSpongy";
import { glassandCrystalFilters } from "./subCategories/glassandCrystal";
import { hairandFurFilters } from "./subCategories/hairandFur";
import { iceandSnowFilters } from "./subCategories/iceandSnow";
import { liquidsFilters } from "./subCategories/liquids";
import { metalFilters } from "./subCategories/metal";
import { meteoriteandGeodeFilters } from "./subCategories/meteoriteandGeode";
import { otherNonNewtonianFluidsandPolymersFilters } from "./subCategories/otherNonNewtonianFluidsandPolymers";
import { otherSolidsFilters } from "./subCategories/otherSolids";
import { plasmaandEnergyFilters } from "./subCategories/plasmaandEnergy";
import { plasticandFoamFilters } from "./subCategories/plasticandFoam";
import { powdersandParticulatesFilters } from "./subCategories/powdersandParticulates";
import { rubberFilters } from "./subCategories/rubber";
import { slimeandPuttyFilters } from "./subCategories/slimeandPutty";
import { soilsFilters } from "./subCategories/soils";
import { stoneandMineralsFilters } from "./subCategories/stoneandMinerals";
import { tapeandAdhesivesFilters } from "./subCategories/tapeandAdhesives";
import { waxFilters } from "./subCategories/wax";
import { woodandPaperFilters } from "./subCategories/woodandPaper";

export const materialsFilters: SubCategoryFilter[] = [
  {
    id: "woodandPaper_2",
    icon: "🧱",
    name: "WoodandPaper",
    options: woodandPaperFilters,
  },
  {
    id: "soils_3",
    icon: "🧱",
    name: "Soils",
    options: soilsFilters,
  },
  {
    id: "stoneandMinerals_4",
    icon: "🧱",
    name: "StoneandMinerals",
    options: stoneandMineralsFilters,
  },
  {
    id: "meteoriteandGeode_5",
    icon: "🧱",
    name: "MeteoriteandGeode",
    options: meteoriteandGeodeFilters,
  },
  {
    id: "metal_6",
    icon: "🧱",
    name: "Metal",
    options: metalFilters,
  },
  {
    id: "glassandCrystal_7",
    icon: "🧱",
    name: "GlassandCrystal",
    options: glassandCrystalFilters,
  },
  {
    id: "cloth_8",
    icon: "🧱",
    name: "Cloth",
    options: clothFilters,
  },
  {
    id: "plasticandFoam_9",
    icon: "🧱",
    name: "PlasticandFoam",
    options: plasticandFoamFilters,
  },
  {
    id: "rubber_10",
    icon: "🧱",
    name: "Rubber",
    options: rubberFilters,
  },
  {
    id: "gelatinousandSpongy_11",
    icon: "🧱",
    name: "GelatinousandSpongy",
    options: gelatinousandSpongyFilters,
  },
  {
    id: "wax_12",
    icon: "🧱",
    name: "Wax",
    options: waxFilters,
  },
  {
    id: "iceandSnow_13",
    icon: "🧱",
    name: "IceandSnow",
    options: iceandSnowFilters,
  },
  {
    id: "hairandFur_14",
    icon: "🧱",
    name: "HairandFur",
    options: hairandFurFilters,
  },
  {
    id: "otherSolids_15",
    icon: "🧱",
    name: "OtherSolids",
    options: otherSolidsFilters,
  },
  {
    id: "liquids_16",
    icon: "🧱",
    name: "Liquids",
    options: liquidsFilters,
  },
  {
    id: "slimeandPutty_18",
    icon: "🧱",
    name: "SlimeandPutty",
    options: slimeandPuttyFilters,
  },
  {
    id: "tapeandAdhesives_19",
    icon: "🧱",
    name: "TapeandAdhesives",
    options: tapeandAdhesivesFilters,
  },
  {
    id: "otherNonNewtonianFluidsandPolymers_20",
    icon: "🧱",
    name: "OtherNon-NewtonianFluidsandPolymers",
    options: otherNonNewtonianFluidsandPolymersFilters,
  },
  {
    id: "gassesandVapors_21",
    icon: "🧱",
    name: "GassesandVapors",
    options: gassesandVaporsFilters,
  },
  {
    id: "powdersandParticulates_22",
    icon: "🧱",
    name: "PowdersandParticulates",
    options: powdersandParticulatesFilters,
  },
  {
    id: "plasmaandEnergy_23",
    icon: "🧱",
    name: "PlasmaandEnergy",
    options: plasmaandEnergyFilters,
  },
];
