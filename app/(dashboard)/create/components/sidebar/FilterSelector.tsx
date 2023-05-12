"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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

import type { StyleFilter } from "../../data/styleFilters";
import { useFilterStore } from "../../store/filterStore";

type ModelSelectorProps = PopoverProps & {};

export function FilterSelector({ ...props }: ModelSelectorProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [
    filters,
    selectedFilters,
    setSelectedFilters,
    peekedFilter,
    setPeekedFilter,
  ] = useFilterStore((state) => [
    state.filters,
    state.selectedFilters,
    state.setSelectedFilters,
    state.peekedFilter,
    state.setPeekedFilter,
  ]);

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
            {selectedFilters.length === 1 && <div>1 filter selected</div>}
            {selectedFilters.length > 1 && (
              <div>{selectedFilters.length} filters selected</div>
            )}
            {/* {selectedFilters.length > 0 ? (
              selectedFilters.map((selectedFilter) => (
                <div key={selectedFilter.id}>
                  {selectedFilter.image && (
                    <Image
                      src={selectedFilter.image}
                      alt={selectedFilter.name}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  )}
                  {selectedFilter.name}
                </div>
              ))
            ) : (
              <div>Select a filter...</div>
            )} */}
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
                          const filterIndex = selectedFilters.findIndex((selectedFilter) => parseInt(selectedFilter.id) === parseInt(filter.id));
                          if (filterIndex !== -1) {
                            console.log("yes");
                            const updatedFilters = selectedFilters;                            
                            updatedFilters.splice(filterIndex, 1);
                            setSelectedFilters(updatedFilters);
                          } else {
                            setSelectedFilters([...selectedFilters, filter]);
                          }
                          setOpen(false);
                          console.log(selectedFilters);
                        }}
                      />
                    ))}
                  </ScrollArea>
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
  filter: StyleFilter;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: StyleFilter) => void;
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
