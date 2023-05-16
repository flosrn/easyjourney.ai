export type CategoryFilter = {
    id: string;
    icone: string;
    name: string;
    options: SubCategoryFilter[];
  };

export type SubCategoryFilter = {
    id: string;
    icone: string;
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
  