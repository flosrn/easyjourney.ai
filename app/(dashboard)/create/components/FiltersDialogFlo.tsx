"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "~/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { ScrollArea } from "~/components/ui/ScrollArea";

import { categoryFilters } from "../data/filter/categoryFilters";
import { themesSubCategoryFilters } from "../data/filter/themes/themesSubCategoryFilters";

type FilterDialogProps = {};

const FilterDialog = ({}: FilterDialogProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilter = searchParams?.has("filterCategory");
  const filterCategory = searchParams?.get("filterCategory");
  const filterSubCategory = searchParams?.get("filterSubCategory");

  const getFilter = (filterCategory: string) => {
    return categoryFilters.find(
      (filter) => filter.name.toLowerCase() === filterCategory
    );
  };

  const getSubFilter = (filterSubCategory: string) => {
    return themesSubCategoryFilters.find(
      (filter) => filter.name.toLowerCase() === filterSubCategory
    );
  };

  const selectedCategory = getFilter(filterCategory);
  const selectedSubCategory = getSubFilter(filterSubCategory);

  return (
    <Dialog open={hasFilter}>
      <DialogContent className="sm:max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <Button onClick={() => router.push("/create")}>Close</Button>
          </DialogDescription>
          <ScrollArea className="h-[70vh]">
            {hasFilter && !filterCategory && (
              <ul>
                {categoryFilters.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/create?filterCategory=${category.name.toLowerCase()}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {selectedCategory && (
              <div>
                <button onClick={() => router.back()} className="mb-5">
                  back
                </button>

                {!selectedSubCategory &&
                  selectedCategory.options.map((subCategory) => (
                    <div key={subCategory.id}>
                      <Link
                        href={`/create?filterCategory=${selectedCategory.name.toLowerCase()}&filterSubCategory=${subCategory.name.toLowerCase()}`}
                      >
                        {subCategory.name}
                      </Link>
                    </div>
                  ))}
                {selectedSubCategory && (
                  <>
                    {selectedSubCategory.options.map((filter) => (
                      <ul key={filter.id}>
                        <li>{filter.name}</li>
                      </ul>
                    ))}
                  </>
                )}
              </div>
            )}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
