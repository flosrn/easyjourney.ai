"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, LayoutListIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";

import { useFilterStore } from "../../store/filterStore";
import { type Filter, type SubCategoryFilter } from "../../types/typeFilters";

type ModelSelectorProps = PopoverProps & {};

export function FilterSelector({ ...props }: ModelSelectorProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilter = searchParams?.has("filterCategory");
  const [
    filters,
    selectedFilters,
    addFilter,
    removeFilter,
    peekedSubCategory,
    peekedFilter,
    setPeekedSubCategory,
    setPeekedFilter,
    isFilterSelectorDisabled,
  ] = useFilterStore((state) => [
    state.subCategories,
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
    state.peekedSubCategory,
    state.peekedFilter,
    state.setPeekedSubCategory,
    state.setPeekedFilter,
    state.isFilterSelectorDisabled,
  ]);

  useEffect(() => {
    hasFilter && setOpen(false);
  }, [hasFilter]);

  useEffect(() => {
    !open && setPeekedFilter(null);
  }, [open, setPeekedFilter]);

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a filter"
            disabled={isFilterSelectorDisabled}
            className="hidden w-full justify-between sm:flex"
          >
            {selectedFilters.length === 0 && <div>Select a filter</div>}
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
            {peekedSubCategory && (
              <HoverCardContent
                side="right"
                align="start"
                sideOffset={260}
                forceMount
                className="hidden min-h-[280px] p-0 md:block"
              >
                <HoverCard>
                  {peekedFilter && (
                    <HoverCardContent
                      side="right"
                      align="start"
                      onClick={() => {
                        const isAlreadySelected = selectedFilters.some(
                          (selectedFilter) =>
                            selectedFilter.id === peekedFilter.id
                        );
                        isAlreadySelected
                          ? removeFilter(peekedFilter)
                          : addFilter(peekedFilter);
                      }}
                      alignOffset={-42}
                      sideOffset={12}
                      forceMount
                      className="hidden min-h-[300px] cursor-pointer p-0 md:block"
                    >
                      <div className="space-y-4 px-4 pt-3">
                        <h4 className="font-medium leading-none">
                          {peekedFilter.name}
                        </h4>
                      </div>
                      <div>
                        <div className="p-4">
                          {peekedFilter.image && (
                            <Image
                              src={peekedFilter.image}
                              alt={peekedFilter.name}
                              width={200}
                              height={200}
                              className="w-full rounded-sm"
                            />
                          )}
                        </div>
                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                          {peekedFilter.description}
                        </div>
                      </div>
                    </HoverCardContent>
                  )}
                  <Command loop>
                    <div className="px-4 py-3">
                      <h4 className="flex items-center font-medium leading-none">
                        <span className="truncate">
                          {peekedSubCategory.name}
                        </span>
                      </h4>
                    </div>
                    <CommandSeparator alwaysRender />
                    <HoverCardTrigger />
                    <CommandGroup className="px-2">
                      <ScrollArea className="h-56">
                        {peekedSubCategory.options.map((filter, index) => (
                          <FilterItem
                            key={index}
                            filter={filter}
                            onPeek={() => setPeekedFilter(filter)}
                            isSelected={selectedFilters.some(
                              (selectedFilter) =>
                                selectedFilter.id === filter.id
                            )}
                            onSelect={() => {
                              const isAlreadySelected = selectedFilters.some(
                                (selectedFilter) =>
                                  selectedFilter.id === filter.id
                              );
                              isAlreadySelected
                                ? removeFilter(filter)
                                : addFilter(filter);
                            }}
                            className="cursor-pointer"
                          />
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </HoverCard>
              </HoverCardContent>
            )}
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Filter Categories..." />
                <CommandEmpty>No Filters found.</CommandEmpty>
                <HoverCardTrigger />
                <CommandGroup>
                  <ScrollArea className="h-56">
                    {filters.map((subCategory, index) => (
                      <FilterItem
                        key={index}
                        filter={subCategory}
                        onPeek={() => setPeekedSubCategory(subCategory)}
                      />
                    ))}
                  </ScrollArea>
                  <CommandSeparator alwaysRender />
                  <CommandGroup className="-mx-1 -mb-1">
                    <CommandItem
                      onSelect={() => router.push("/create?filterCategory")}
                      className="flex-center cursor-pointer text-sm text-muted-foreground"
                    >
                      <LayoutListIcon className="mr-2 h-4 w-4" />
                      Discover all filters
                    </CommandItem>
                  </CommandGroup>
                </CommandGroup>
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        onClick={() => router.push("/create?filterCategory")}
        aria-label="Select a filter"
        className="flex justify-between sm:hidden"
      >
        Select a filter...
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </div>
  );
}

type ModelItemProps = {
  filter: Filter | SubCategoryFilter;
  onPeek: (filter: Filter | SubCategoryFilter) => void;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
};

const FilterItem = ({
  filter,
  onPeek,
  isSelected,
  onSelect,
  className,
}: ModelItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <CommandItem
        key={filter.id}
        ref={ref}
        onSelect={onSelect}
        onMouseEnter={(event) => {
          event.preventDefault();
          onPeek(filter);
        }}
        className={cn(
          "aria-selected:bg-primary aria-selected:text-primary-foreground",
          className
        )}
      >
        {filter.name}
        <Check
          className={cn(
            "ml-auto h-4 w-4",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        />
      </CommandItem>
    </>
  );
};
