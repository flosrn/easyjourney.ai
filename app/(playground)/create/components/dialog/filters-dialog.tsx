import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBigLeftIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

import { categoryFilters } from "../../data/filter/categoryFilters";
import { useFilterStore } from "../../store/filterStore";
import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../types/typeFilters";
import FiltersBadge from "../badge/filters-badge";
import CategoryListCards, {
  CategoryFilterType,
} from "../cards/category-list-cards";
import FilterCard from "../cards/filter-card";
import Breadcrumbs from "./breadcrumbs";

type FilterDialogProps = {};

const FiltersDialog = ({}: FilterDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilter = searchParams?.has("filterCategory");
  const filterCategory = searchParams?.get("filterCategory");
  const filterSubCategory = searchParams?.get("filterSubCategory");
  const isHomeDialog = searchParams?.toString() === "filterCategory=";

  useEffect(() => {
    hasFilter && setIsDialogOpen(hasFilter);
  }, [hasFilter]);

  const handleDialogChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    !isOpen && router.push("/create");
  };

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
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="relative flex h-[95svh] w-[90vw] flex-col overflow-hidden md:max-h-[85svh] md:max-w-[80vw] lg:max-w-5xl">
        <DialogHeader className="max-h-[10vh] pl-1 md:h-[10]">
          <DialogTitle>
            <Breadcrumbs
              category={selectedCategory}
              subCategory={selectedSubCategory}
            />
            <FiltersBadge />
          </DialogTitle>
        </DialogHeader>
        <div>
          <ScrollArea className="h-[calc(70vh+82px)] md:h-[calc(56vh+82px)]">
            <div className="h-full pb-14 pl-1 pr-4">
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
                    <div className="grid gap-3 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="absolute bottom-0 left-0 h-16 w-full rounded-xl bg-background md:h-20">
          <div className="relative flex w-full items-center justify-between px-10">
            <Separator className="absolute left-0 top-0 w-full" />
            <Button
              disabled={isHomeDialog}
              onClick={() => router.back()}
              variant="outline"
            >
              <ArrowBigLeftIcon className="inline-block" size={20} />
            </Button>
            <Button
              variant="success"
              onClick={() => handleDialogChange(false)}
              className="px-4 sm:w-min"
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
