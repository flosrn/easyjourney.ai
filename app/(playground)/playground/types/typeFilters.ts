export type StyleFilter = {
  id: string;
  name: string;
  description: string;
  style: string;
  image: string;
};

export type CategoryFilter = {
  id: string;
  icon: string;
  name: string;
  options: SubCategoryFilter[];
};

export type SubCategoryFilter = {
  id: string;
  icon: string;
  name: string;
  options: Filter[];
};

export type Filter = {
  id: string;
  name: string;
  description: string;
  style: string;
  image: string;
  isSelected?: boolean;
};
