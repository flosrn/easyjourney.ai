import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { ScrollArea } from "~/components/ui/ScrollArea";
import { Separator } from "~/components/ui/Separator";

import { categoryFilters } from "../../data/filter/categoryFilters";
import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../data/filter/typeFilters";
import { useFilterStore } from "../../store/filterStore";
import FiltersBadge from "../badge/FiltersBadge";
import Breadcrumbs from "./Breadcrumbs";
import CategoryListCards, {
  CategoryFilterType,
} from "./cards/CategoryListCards";
import FilterCard from "./cards/FilterCard";

type FilterDialogProps = {};

const FiltersDialog = ({}: FilterDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilter = searchParams?.has("filterCategory");
  const filterCategory = searchParams?.get("filterCategory");
  const filterSubCategory = searchParams?.get("filterSubCategory");

  useEffect(() => {
    hasFilter && setIsDialogOpen(hasFilter);
  }, [hasFilter]);

  useEffect(() => {
    !isDialogOpen && router.push("/create");
  }, [isDialogOpen, router]);

  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);

  const getFilter = (category: string | null | undefined) =>
    categoryFilters.find((filter) => filter.name.toLowerCase() === category);

  const getSubFilter = (subCategory: string | null | undefined) =>
    selectedCategory?.options.find(
      (filter) => filter.name.toLowerCase() === subCategory
    );

  const selectedCategory: CategoryFilter | undefined =
    getFilter(filterCategory);

  const selectedSubCategory: SubCategoryFilter | undefined =
    getSubFilter(filterSubCategory);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="flex max-h-screen min-h-screen flex-col md:max-h-[80vh] md:min-h-[80vh] md:min-w-[80vw] md:max-w-[80vw]">
        <DialogHeader className="max-h-[10vh] md:h-[10]">
          <DialogTitle>
            <Breadcrumbs
              category={selectedCategory}
              subCategory={selectedSubCategory}
            />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="h-[70vh] md:h-[56vh]">
            {hasFilter && !filterCategory && (
              <CategoryListCards
                type={CategoryFilterType.CATEGORY}
                categories={categoryFilters}
                selectedCategory={selectedCategory?.name.toLowerCase()}
              />
            )}
            {selectedCategory && (
              <>
                {!selectedSubCategory && (
                  <CategoryListCards
                    type={CategoryFilterType.SUBCATEGORY}
                    categories={selectedCategory.options}
                    selectedCategory={selectedCategory.name.toLowerCase()}
                  />
                )}
                {selectedSubCategory && (
                  <div className="flex flex-wrap">
                    {selectedSubCategory.options.map((filter) => {
                      const isActive = selectedFilters.some(
                        (selectedFilter) => selectedFilter.id === filter.id
                      );
                      return (
                        <FilterCard
                          key={filter.id}
                          {...filter}
                          isActive={isActive}
                          clickHandler={isActive ? removeFilter : addFilter}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </ScrollArea>
        </DialogDescription>
        <Separator />
        <DialogFooter className="h-full">
          <FiltersBadge />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
