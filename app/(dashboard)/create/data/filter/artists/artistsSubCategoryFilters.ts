import type { SubCategoryFilter } from "../typeFilters";
import { abstractFilters } from "./subCategories/abstract";
import { artNouveauFilters } from "./subCategories/artNouveau";
import { artstationArtistFilters } from "./subCategories/artstationArtist";
import { baroqueFilters } from "./subCategories/baroque";
import { conceptArtFilters } from "./subCategories/conceptArt";
import { dadaismFilters } from "./subCategories/dadaism";
import { expressionismFilters } from "./subCategories/expressionism";
import { futurismFilters } from "./subCategories/futurism";
import { gothicFilters } from "./subCategories/gothic";
import { graffitiArtistsFilters } from "./subCategories/graffitiArtists";
import { idealismFilters } from "./subCategories/idealism";
import { instagramArtistFilters } from "./subCategories/instagramArtist";
import { luminismFilters } from "./subCategories/luminism";
import { mangaFilters } from "./subCategories/manga";
import { modernismFilters } from "./subCategories/modernism";
import { neoDadaismFilters } from "./subCategories/neoDadaism";
import { nonPaintersSculptorsPhotographersWritersFilters } from "./subCategories/nonPaintersSculptorsPhotographersWriters";
import { otherArtistsFilters } from "./subCategories/otherArtists";
import { photographersFilters } from "./subCategories/photographers";
import { popArtFilters } from "./subCategories/popArt";
import { postImpressionismFilters } from "./subCategories/postImpressionism";
import { psychedelicFilters } from "./subCategories/psychedelic";
import { realismFilters } from "./subCategories/realism";
import { renaissanceFilters } from "./subCategories/renaissance";
import { romanticismFilters } from "./subCategories/romanticism";
import { sculptorsFilters } from "./subCategories/sculptors";
import { surrealismFilters } from "./subCategories/surrealism";
import { vedutePaintingStyleFilters } from "./subCategories/vedutePaintingStyle";
import { writersFilters } from "./subCategories/writers";

export const artistsFilters: SubCategoryFilter[] = [
  {
    id: "realism_1",
    icon: "📔",
    name: "Realism",
    options: realismFilters,
  },
  {
    id: "surrealism_2",
    icon: "📔",
    name: "Surrealism",
    options: surrealismFilters,
  },
  {
    id: "idealism_3",
    icon: "📔",
    name: "Idealism",
    options: idealismFilters,
  },
  {
    id: "abstract_4",
    icon: "📔",
    name: "Abstract",
    options: abstractFilters,
  },
  {
    id: "modernism_5",
    icon: "📔",
    name: "Modernism",
    options: modernismFilters,
  },
  {
    id: "postImpressionism_6",
    icon: "📔",
    name: "Post-Impressionism",
    options: postImpressionismFilters,
  },
  {
    id: "artNouveau_7",
    icon: "📔",
    name: "ArtNouveau",
    options: artNouveauFilters,
  },
  {
    id: "luminism_8",
    icon: "📔",
    name: "Luminism",
    options: luminismFilters,
  },
  {
    id: "expressionism_9",
    icon: "📔",
    name: "Expressionism",
    options: expressionismFilters,
  },
  {
    id: "futurism_10",
    icon: "📔",
    name: "Futurism",
    options: futurismFilters,
  },
  {
    id: "gothic_11",
    icon: "📔",
    name: "Gothic",
    options: gothicFilters,
  },
  {
    id: "psychedelic_12",
    icon: "📔",
    name: "Psychedelic",
    options: psychedelicFilters,
  },
  {
    id: "popArt_13",
    icon: "📔",
    name: "PopArt",
    options: popArtFilters,
  },
  {
    id: "conceptArt_14",
    icon: "📔",
    name: "ConceptArt",
    options: conceptArtFilters,
  },
  {
    id: "romanticism_15",
    icon: "📔",
    name: "Romanticism",
    options: romanticismFilters,
  },
  {
    id: "renaissance_16",
    icon: "📔",
    name: "Renaissance",
    options: renaissanceFilters,
  },
  {
    id: "vedutePaintingStyle_17",
    icon: "📔",
    name: "VedutePaintingStyle",
    options: vedutePaintingStyleFilters,
  },
  {
    id: "baroque_18",
    icon: "📔",
    name: "Baroque",
    options: baroqueFilters,
  },
  {
    id: "dadaism_19",
    icon: "📔",
    name: "Dadaism",
    options: dadaismFilters,
  },
  {
    id: "neoDadaism_20",
    icon: "📔",
    name: "Neo-Dadaism",
    options: neoDadaismFilters,
  },
  {
    id: "graffitiArtists_21",
    icon: "📔",
    name: "GraffitiArtists",
    options: graffitiArtistsFilters,
  },
  {
    id: "instagramArtist_22",
    icon: "📔",
    name: "InstagramArtist",
    options: instagramArtistFilters,
  },
  {
    id: "artstationArtist_23",
    icon: "📔",
    name: "ArtstationArtist",
    options: artstationArtistFilters,
  },
  {
    id: "manga_24",
    icon: "📔",
    name: "Manga",
    options: mangaFilters,
  },
  {
    id: "nonPaintersSculptorsPhotographersWriters_25",
    icon: "📔",
    name: "Non-PaintersSculptorsPhotographersWriters",
    options: nonPaintersSculptorsPhotographersWritersFilters,
  },
  {
    id: "sculptors_26",
    icon: "📔",
    name: "Sculptors",
    options: sculptorsFilters,
  },
  {
    id: "photographers_27",
    icon: "📔",
    name: "Photographers",
    options: photographersFilters,
  },
  {
    id: "writers_28",
    icon: "📔",
    name: "Writers",
    options: writersFilters,
  },
  {
    id: "otherArtists_29",
    icon: "📔",
    name: "OtherArtists",
    options: otherArtistsFilters,
  },
];
