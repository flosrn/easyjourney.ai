import type { SubCategoryFilter } from "../../../types/typeFilters";
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
    icon: "📔⛱ ",
    name: "Realism",
    options: realismFilters,
  },
  {
    id: "surrealism_2",
    icon: "📔❇ ",
    name: "Surrealism",
    options: surrealismFilters,
  },
  {
    id: "idealism_3",
    icon: "📔🔆",
    name: "Idealism",
    options: idealismFilters,
  },
  {
    id: "abstract_4",
    icon: "📔💮",
    name: "Abstract",
    options: abstractFilters,
  },
  {
    id: "modernism_5",
    icon: "📔🧬 ",
    name: "Modernism",
    options: modernismFilters,
  },
  {
    id: "postImpressionism_6",
    icon: "📔➿",
    name: "Post-Impressionism",
    options: postImpressionismFilters,
  },
  {
    id: "artNouveau_7",
    icon: "📔⚜",
    name: "Art Nouveau",
    options: artNouveauFilters,
  },
  {
    id: "luminism_8",
    icon: "📔🌄",
    name: "Luminism",
    options: luminismFilters,
  },
  {
    id: "expressionism_9",
    icon: "📔🦋",
    name: "Expressionism",
    options: expressionismFilters,
  },
  {
    id: "futurism_10",
    icon: "📔🔳",
    name: "Futurism",
    options: futurismFilters,
  },
  {
    id: "gothic_11",
    icon: "📔⬛",
    name: "Gothic",
    options: gothicFilters,
  },
  {
    id: "psychedelic_12",
    icon: "📔☯ ",
    name: "Psychedelic",
    options: psychedelicFilters,
  },
  {
    id: "popArt_13",
    icon: "📔🔴",
    name: "Pop Art",
    options: popArtFilters,
  },
  {
    id: "conceptArt_14",
    icon: "📔🧿",
    name: "Concept Art",
    options: conceptArtFilters,
  },
  {
    id: "romanticism_15",
    icon: "📔❤",
    name: "Romanticism",
    options: romanticismFilters,
  },
  {
    id: "renaissance_16",
    icon: "📔✡️",
    name: "Renaissance",
    options: renaissanceFilters,
  },
  {
    id: "vedutePaintingStyle_17",
    icon: "📔🌇",
    name: "Vedute Painting Style",
    options: vedutePaintingStyleFilters,
  },
  {
    id: "baroque_18",
    icon: "📔🏘 ",
    name: "Baroque",
    options: baroqueFilters,
  },
  {
    id: "dadaism_19",
    icon: "📔👁‍🗨",
    name: "Dadaism",
    options: dadaismFilters,
  },
  {
    id: "neoDadaism_20",
    icon: "📔👁‍🗨 ",
    name: "Neo-Dadaism",
    options: neoDadaismFilters,
  },
  {
    id: "graffitiArtists_21",
    icon: "📔💨",
    name: "Graffiti Artists",
    options: graffitiArtistsFilters,
  },
  {
    id: "instagramArtist_22",
    icon: "📔🖼",
    name: "Instagram Artist",
    options: instagramArtistFilters,
  },
  {
    id: "artstationArtist_23",
    icon: "📔🖼",
    name: "Artstation Artist",
    options: artstationArtistFilters,
  },
  {
    id: "manga_24",
    icon: "📔🈯",
    name: "Manga",
    options: mangaFilters,
  },
  {
    id: "sculptors_26",
    icon: "📔🗿",
    name: "Sculptors",
    options: sculptorsFilters,
  },
  {
    id: "photographers_27",
    icon: "📔📷",
    name: "Photographers",
    options: photographersFilters,
  },
  {
    id: "writers_28",
    icon: "📔✍ ",
    name: "Writers",
    options: writersFilters,
  },
  {
    id: "otherArtists_29",
    icon: "📔",
    name: "Other Artists",
    options: otherArtistsFilters,
  },
];
