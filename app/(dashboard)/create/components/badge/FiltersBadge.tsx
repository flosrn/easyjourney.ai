import React from "react";

import { Badge } from "~/components/ui/Badge";
import { Card } from "~/components/ui/Card";
import { ScrollArea } from "~/components/ui/ScrollArea";

import { useFilterStore } from "../../store/filterStore";

const FiltersBadge = () => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);

  return (
    <Card className=" max-h-[8vh]">
      <ScrollArea className=" h-[8vh]">
        {selectedFilters.map((filter) => {
          const isAlreadySelected = selectedFilters.some(
            (selectedFilter) => selectedFilter.id === filter.id
          );
          return (
            <Badge
              key={filter.id}
              className="m-1 cursor-pointer"
              onClick={() => {
                isAlreadySelected ? removeFilter(filter) : addFilter(filter);
              }}
              variant="outline"
            >
              {filter.name}
            </Badge>
          );
        })}
      </ScrollArea>
    </Card>
  );
};

export default FiltersBadge;
