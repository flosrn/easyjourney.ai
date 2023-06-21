export type BoardType = {
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  isPublic: boolean;
  boardPosters?: BoardPosterType[];
};

export type BoardPosterType = {
  boardId: string;
  posterId: string;
  position: number;
};
