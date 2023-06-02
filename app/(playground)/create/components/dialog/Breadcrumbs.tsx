import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "~/lib/classNames";

import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../types/typeFilters";
import EmojiIcon from "./emoji-icon";

type BreadcrumbsProps = {
  category?: CategoryFilter;
  subCategory?: SubCategoryFilter;
};

const Breadcrumbs = ({ category, subCategory }: BreadcrumbsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterCategory = searchParams?.get("filterCategory");
  const isHomeDialog = searchParams?.toString() === "filterCategory=";
  const categoryName = category?.name.toLowerCase();
  const subCategoryName = subCategory?.name.toLowerCase();
  return (
    <div className="flex items-center space-x-2 text-xs text-muted-foreground md:text-lg">
      <button
        disabled={isHomeDialog}
        onClick={() => router.push("/create?filterCategory")}
        className={cn("focus-visible:outline-none", {
          "text-foreground": isHomeDialog,
          "hover:text-foreground hover:underline": !isHomeDialog,
        })}
      >
        All categories
      </button>
      {category && (
        <>
          <span>/</span>
          <button
            disabled={!!filterCategory && !subCategory}
            onClick={() =>
              router.push(`/create?filterCategory=${categoryName}`)
            }
            className={cn("flex items-center", {
              "text-foreground": filterCategory && !subCategory,
              "hover:text-foreground hover:underline":
                filterCategory && subCategory,
            })}
          >
            <EmojiIcon icon={category.icon} className="mr-2" />
            {category.name}
          </button>
        </>
      )}
      {category && subCategory && (
        <>
          <span>/</span>
          <button
            disabled={!!subCategory}
            onClick={() =>
              router.push(
                `/create?filterCategory=${categoryName}&filterSubCategory=${subCategoryName}`
              )
            }
            className={cn("flex items-center", {
              "text-foreground": subCategory,
            })}
          >
            <EmojiIcon icon={subCategory.icon} className="mr-2" />
            {subCategory.name}
          </button>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
