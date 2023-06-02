import React from "react";
import Link from "next/link";

import { Card } from "~/components/ui/card";

import {
  type CategoryFilter,
  type SubCategoryFilter,
} from "../../types/typeFilters";
import EmojiIcon from "../dialog/emoji-icon";

export enum CategoryFilterType {
  "CATEGORY" = "CATEGORY",
  "SUBCATEGORY" = "SUBCATEGORY",
}

type CategoryListCardsProps = {
  type: CategoryFilterType;
  categories: CategoryFilter[] | SubCategoryFilter[];
  selectedCategory?: string;
};

const getHref = ({
  type,
  category,
  selectedCategory,
}: {
  type: CategoryFilterType;
  category: CategoryFilter | SubCategoryFilter;
  selectedCategory?: string;
}) => {
  const isSubCategory = type === CategoryFilterType.SUBCATEGORY;
  return `/create?filterCategory=${
    selectedCategory ?? category.name.toLowerCase()
  }${isSubCategory ? `&filterSubCategory=${category.name.toLowerCase()}` : ""}`;
};

const CategoryListCards = ({
  type,
  categories,
  selectedCategory,
}: CategoryListCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="px-6 py-3">
          <Link
            key={category.id}
            href={getHref({ selectedCategory, category, type })}
            className="flex items-center space-x-5 text-sm md:text-lg"
          >
            <EmojiIcon icon={category.icon} />
            <span className="truncate">{category.name}</span>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CategoryListCards;
