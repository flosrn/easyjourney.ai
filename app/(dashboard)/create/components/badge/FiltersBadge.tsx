import React from "react";

import { Badge } from "~/components/ui/Badge";

import { useFilterStore } from "../../store/filterStore";

const FiltersBadge = () => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);
  return (
    <div className="mt-6 flex h-[30px] justify-start space-x-1">
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
            className="cursor-pointer"
          >
            {filter.name}
          </Badge>
        );
      })}
    </div>
  );
};

export default FiltersBadge;
