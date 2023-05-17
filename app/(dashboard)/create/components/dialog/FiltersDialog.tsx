import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Card } from "~/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { ScrollArea } from "~/components/ui/ScrollArea";

import { cn } from "~/lib/classNames";

import { categoryFilters } from "../../data/filter/categoryFilters";
import type {
  CategoryFilter,
  SubCategoryFilter,
} from "../../data/filter/typeFilters";
import { useFilterStore } from "../../store/filterStore";
import FiltersBadge from "../badge/FiltersBadge";
import Breadcrumbs from "./Breadcrumbs";
import EmojiIcon from "./EmojiIcon";

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

  // eslint-disable-next-line no-shadow
  const getFilter = (filterCategory: string | null | undefined) => {
    return categoryFilters.find(
      (filter) => filter.name.toLowerCase() === filterCategory
    );
  };

  const selectedCategory: CategoryFilter | undefined =
    getFilter(filterCategory);

  // eslint-disable-next-line no-shadow
  const getSubFilter = (filterSubCategory: string | null | undefined) => {
    return selectedCategory?.options.find(
      (filter) => filter.name.toLowerCase() === filterSubCategory
    );
  };
  const selectedSubCategory: SubCategoryFilter | undefined =
    getSubFilter(filterSubCategory);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="flex flex-col sm:max-h-[75vh] sm:min-h-[75vh] sm:min-w-[75vw] sm:max-w-[75vw]">
        <DialogHeader className="h-10">
          <DialogTitle>
            <Breadcrumbs
              category={selectedCategory}
              subCategory={selectedSubCategory}
            />
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          <ScrollArea className="h-[55vh]">
            {hasFilter && !filterCategory && (
              <div className="grid grid-cols-3 gap-4">
                {categoryFilters.map((category) => (
                  <Card key={category.id} className="p-3">
                    <Link
                      href={`/create?filterCategory=${category.name.toLowerCase()}`}
                      className="flex-center text-xl"
                    >
                      <EmojiIcon icon={category.icon} />
                      {category.name}
                    </Link>
                  </Card>
                ))}
              </div>
            )}
            {selectedCategory && (
              <>
                {!selectedSubCategory && (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedCategory.options.map((subCategory) => (
                      <Card key={subCategory.id} className="p-3">
                        <Link
                          href={`/create?filterCategory=${selectedCategory.name.toLowerCase()}&filterSubCategory=${subCategory.name.toLowerCase()}`}
                          className="flex-center text-xl"
                          key={subCategory.id}
                        >
                          <EmojiIcon icon={subCategory.icon} />
                          {subCategory.name}
                        </Link>
                      </Card>
                    ))}
                  </div>
                )}
                {selectedSubCategory && (
                  <div className="flex flex-wrap">
                    {selectedSubCategory.options.map((filter) => {
                      const isAlreadySelected = selectedFilters.some(
                        (selectedFilter) => selectedFilter.id === filter.id
                      );
                      return (
                        <Card
                          key={filter.id}
                          className={cn("m-3 w-1/6 cursor-pointer", {
                            "outline outline-1 outline-offset-2 outline-blue-500":
                              isAlreadySelected,
                          })}
                          onClick={() => {
                            isAlreadySelected
                              ? removeFilter(filter)
                              : addFilter(filter);
                          }}
                        >
                          <div className="p-3 text-center text-base font-bold">
                            {filter.name}
                          </div>
                          <Image
                            src={filter.image}
                            alt={filter.name}
                            width={200}
                            height={200}
                            className="w-full"
                          />
                          <div className="p-3 text-center">
                            {filter.description}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </ScrollArea>
        </DialogDescription>
        <DialogFooter className="h-full">
          <FiltersBadge />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
