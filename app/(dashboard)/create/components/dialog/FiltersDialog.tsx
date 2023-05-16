import React, { useState } from "react";
import Image from "next/image";

import { Badge } from "~/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";

import { categoryFilters } from "../../data/filter/categoryFilters";
import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../data/filter/typeFilters";
import { useFilterStore } from "../../store/filterStore";

const FiltersDialog = () => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter | null>();
  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryFilter | null>();
  const handleSubCategoryClick = (subCategory: SubCategoryFilter | null) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <Dialog>
      <DialogTrigger>All Filters</DialogTrigger>
      <DialogContent className="h-screen w-screen p-8">
        <DialogHeader className=" h-4/5 overflow-y-auto">
          <DialogTitle>
            <div onClick={() => setSelectedCategory(null)}>
              {selectedCategory?.icon} {selectedCategory?.name}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div>
              {selectedCategory ? (
                <>
                  <ul>
                    {selectedCategory.options.map((subCategory) => (
                      <li key={subCategory.id}>
                        <div
                          onClick={() =>
                            selectedSubCategory
                              ? handleSubCategoryClick(null)
                              : handleSubCategoryClick(subCategory)
                          }
                        >
                          {subCategory.icon} {subCategory.name}
                        </div>
                        <div className="flex flex-wrap">
                          {subCategory === selectedSubCategory &&
                            selectedSubCategory.options.map((filter) => {
                              const isAlreadySelected = selectedFilters.some(
                                (selectedFilter) =>
                                  selectedFilter.id === filter.id
                              );
                              return (
                                <div
                                  className="w-1/5"
                                  key={filter.id}
                                  onClick={() => {
                                    isAlreadySelected
                                      ? removeFilter(filter)
                                      : addFilter(filter);
                                  }}
                                >
                                  <div className=" w-1/5 border border-white">
                                    <div className="border border-white">
                                      {filter.name}
                                    </div>
                                    <div className="border border-white">
                                      {filter.description}
                                    </div>
                                    <Image
                                      src={filter.image}
                                      alt={filter.name}
                                      width={200}
                                      height={200}
                                      className="mt-4 w-full"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {categoryFilters.map((category) => (
                    <div
                      className="flex justify-center rounded border border-solid border-white"
                      key={category.id}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.icon} {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-auto overflow-x-scroll">
          {selectedFilters.map((filter) => {
            const isAlreadySelected = selectedFilters.some(
              (selectedFilter) => selectedFilter.id === filter.id
            );
            return (
              <Badge
                key={filter.id}
                onClick={() => {
                  isAlreadySelected ? removeFilter(filter) : addFilter(filter);
                }}
                variant="outline"
              >
                {filter.name}
              </Badge>
            );
          })}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
