"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import type { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, LayoutListIcon } from "lucide-react";

import { Button } from "~/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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

import type { Filter } from "../../data/filter/typeFilters";
import { useFilterStore } from "../../store/filterStore";

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
            {peekedFilter && (
              <HoverCardContent
                side="right"
                align="start"
                sideOffset={260}
                forceMount
                className="hidden min-h-[280px] md:block"
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
            )}
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Filters..." />
                <CommandEmpty>No Filters found.</CommandEmpty>
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
                        onSelect={() => {
                          const isAlreadySelected = selectedFilters.some(
                            (selectedFilter) => selectedFilter.id === filter.id
                          );
                          isAlreadySelected
                            ? removeFilter(filter)
                            : addFilter(filter);
                        }}
                      />
                    ))}
                  </ScrollArea>
                  <CommandSeparator alwaysRender />
                  <CommandGroup className="-mx-1 -mb-1">
                    <CommandItem
                      onSelect={() => {
                        router.push("/create?filterCategory");
                      }}
                      className="text-muted-foreground flex-center text-sm"
                    >
                      <LayoutListIcon className="mr-2 h-4 w-4" />
                      View all filters
                    </CommandItem>
                  </CommandGroup>
                </CommandGroup>
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type ModelItemProps = {
  filter: Filter;
  isSelected: boolean;
  onSelect: () => void;
};

const FilterItem = ({ filter, isSelected, onSelect }: ModelItemProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const onPeek = useFilterStore((state) => state.setPeekedFilter);
  return (
    <CommandItem
      key={filter.id}
      ref={ref}
      onSelect={onSelect}
      onMouseEnter={(event) => {
        event.preventDefault();
        onPeek(filter);
      }}
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
};
