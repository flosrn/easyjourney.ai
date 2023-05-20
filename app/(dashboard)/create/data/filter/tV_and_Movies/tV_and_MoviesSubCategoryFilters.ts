import type { SubCategoryFilter } from "../typeFilters";
import { animeFilters } from "./subCategories/anime";
import { moviesFilters } from "./subCategories/movies";
import { tVShowsFilters } from "./subCategories/tVShows";

export const tVAndMoviesFilters: SubCategoryFilter[] = [
  {
    id: "anime_1",
    icon: "🎬",
    name: "Anime",
    options: animeFilters,
  },
  {
    id: "tVShows_2",
    icon: "🎬",
    name: "TVShows",
    options: tVShowsFilters,
  },
  {
    id: "movies_3",
    icon: "🎬",
    name: "Movies",
    options: moviesFilters,
  },
];
