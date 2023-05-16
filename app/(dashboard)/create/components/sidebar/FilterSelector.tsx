"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import type { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMutationObserver } from "~/hooks/use-mutation-observer";

import { Button } from "~/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/Command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/HoverCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import { ScrollArea } from "~/components/ui/ScrollArea";

import { cn } from "~/lib/classNames";

import { categoryFilters } from "../../data/filter/categoryFilters";
import type {
  CategoryFilter,
  Filter,
  SubCategoryFilter,
} from "../../data/filter/typeFilters";
import { useFilterStore } from "../../store/filterStore";
import Modal from "./Modal";

type ModelSelectorProps = PopoverProps & {};

export function FilterSelector({ ...props }: ModelSelectorProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter | null>();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryFilter | null>();

  const [
    filters,
    selectedFilters,
    addFilter,
    removeFilter,
    peekedFilter,
    setPeekedFilter,
  ] = useFilterStore((state) => [
    state.filters,
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
    state.peekedFilter,
    state.setPeekedFilter,
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  const handleSubCategoryClick = (subCategory: SubCategoryFilter | null) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedFilters.length === 0 && <div>Select a filter...</div>}
            {selectedFilters.length > 1 && (
              <div>{selectedFilters.length} filters selected</div>
            )}
            {selectedFilters.length === 1 &&
              selectedFilters.map((selectedFilter) => (
                <div
                  key={selectedFilter.id}
                  className="flex items-center space-x-2"
                >
                  {selectedFilter.image && (
                    <Image
                      src={selectedFilter.image}
                      alt={selectedFilter.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-sm"
                    />
                  )}
                  <span>{selectedFilter.name}</span>
                </div>
              ))}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="right"
              align="start"
              sideOffset={260}
              forceMount
              className="min-h-[280px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">
                  {peekedFilter.name}
                </h4>
                <div className="text-muted-foreground text-sm">
                  {peekedFilter.description}
                </div>
              </div>
              {peekedFilter.image && (
                <Image
                  src={peekedFilter.image}
                  alt={peekedFilter.name}
                  width={200}
                  height={200}
                  className="mt-4 w-full"
                />
              )}
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                <CommandGroup>
                  <ScrollArea className="h-56">
                    {filters.map((filter) => (
                      <FilterItem
                        key={filter.id}
                        filter={filter}
                        isSelected={selectedFilters.some(
                          (selectedFilter) => selectedFilter.id === filter.id
                        )}
                        onPeek={(styleFilter) => setPeekedFilter(styleFilter)}
                        onSelect={() => {
                          const isAlreadySelected = selectedFilters.some(
                            (selectedFilter) => selectedFilter.id === filter.id
                          );
                          isAlreadySelected
                            ? removeFilter(filter)
                            : addFilter(filter);
                          setOpen(false);
                        }}
                      />
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedCategory ? (
            <>
              <h2>{selectedCategory.name}</h2>
              <ul className="">
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
                    {subCategory === selectedSubCategory &&
                      selectedSubCategory.options.map((filter) => {
                        const isAlreadySelected = selectedFilters.some(
                          (selectedFilter) => selectedFilter.id === filter.id
                        );
                        return (
                          <div
                            key={filter.id}
                            onClick={() => {
                              isAlreadySelected
                                ? removeFilter(filter)
                                : addFilter(filter);
                            }}
                          >
                            {filter.name}
                          </div>
                        );
                      })}
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
          <Button className="absolute right-0 top-0" onClick={toggleModal}>
            X
          </Button>
        </Modal>
      </Popover>
    </div>
  );
}
type ModelItemProps = {
  filter: Filter;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Filter) => void;
};

function FilterItem({ filter, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected"
      ) {
        onPeek(filter);
      }
    }
  });

  return (
    <CommandItem
      key={filter.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {filter.name}
      <Check
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}
