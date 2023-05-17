import React from "react";
import { useRouter } from "next/navigation";

import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../data/filter/typeFilters";
import EmojiIcon from "./EmojiIcon";

type BreadcrumbsProps = {
  category?: CategoryFilter;
  subCategory?: SubCategoryFilter;
};

const Breadcrumbs = ({ category, subCategory }: BreadcrumbsProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => router.push("/create?filterCategory")}>
        All categories
      </button>
      {category && (
        <>
          <span>/</span>
          <button
            onClick={() =>
              router.push(
                `/create?filterCategory=${category.name.toLowerCase()}`
              )
            }
            className="flex items-center"
          >
            <EmojiIcon icon={category.icon} />
            {category.name}
          </button>
        </>
      )}
      {subCategory && (
        <>
          <span>/</span>
          <button
            onClick={() =>
              router.push(
                `/create?filterCategory=${category.name.toLowerCase()}&filterSubCategory=${subCategory.name.toLowerCase()}`
              )
            }
            className="flex items-center"
          >
            <EmojiIcon icon={subCategory.icon} />
            {subCategory.name}
          </button>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
