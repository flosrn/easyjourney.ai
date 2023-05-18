import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Badge } from "~/components/ui/Badge";

import { useFilterStore } from "../../store/filterStore";

const FiltersBadge = () => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);
  return (
    <div className="mt-6 h-[30px]">
      <Swiper slidesPerView="auto" spaceBetween={5}>
        {selectedFilters.map((filter) => {
          const isAlreadySelected = selectedFilters.some(
            (selectedFilter) => selectedFilter.id === filter.id
          );
          return (
            <SwiperSlide key={filter.id} className="!w-fit">
              <Badge
                onClick={() => {
                  isAlreadySelected ? removeFilter(filter) : addFilter(filter);
                }}
                variant="outline"
                className="shrink-0 cursor-pointer"
              >
                {filter.name}
              </Badge>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FiltersBadge;
