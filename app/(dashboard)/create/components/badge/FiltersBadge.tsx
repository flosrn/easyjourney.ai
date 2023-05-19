import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Badge } from "~/components/ui/Badge";

import { useFilterStore } from "../../store/filterStore";

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const FiltersBadge = () => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);
  return (
    <div className="mt-6 h-[30px]">
      <Swiper slidesPerView="auto" spaceBetween={5}>
        <AnimatePresence initial={false}>
          {selectedFilters.map((filter) => {
            const isAlreadySelected = selectedFilters.some(
              (selectedFilter) => selectedFilter.id === filter.id
            );
            return (
              <SwiperSlide key={filter.id} className="!w-fit">
                <motion.div
                  layout
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileTap={{ scale: 0.8 }}
                >
                  <Badge
                    onClick={() => {
                      isAlreadySelected
                        ? removeFilter(filter)
                        : addFilter(filter);
                    }}
                    variant="outline"
                    className="shrink-0 cursor-pointer"
                  >
                    {filter.name}
                  </Badge>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </AnimatePresence>
      </Swiper>
    </div>
  );
};

export default FiltersBadge;
