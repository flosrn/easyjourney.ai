import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import { Badge } from "~/components/ui/badge";

import { useFilterStore } from "../../store/filterStore";

import "swiper/css";

import { cn } from "~/lib/classNames";

type FiltersBadgeProps = {
  className?: string;
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.5 },
};

const wobble = {
  scale: 1.03,
  rotate: [0, 1, -1, 1, -1, 0],
  transition: {
    scale: { duration: 0.1 },
    rotate: {
      duration: 0.5,
      loop: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const FiltersBadge = ({ className }: FiltersBadgeProps) => {
  const [selectedFilters, addFilter, removeFilter] = useFilterStore((state) => [
    state.selectedFilters,
    state.addFilter,
    state.removeFilter,
  ]);
  return (
    <div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={5}
        className={cn("relative h-7 !px-1", className)}
      >
        <AnimatePresence initial={false}>
          {selectedFilters.map((filter) => {
            const isAlreadySelected = selectedFilters.some(
              (selectedFilter) => selectedFilter.id === filter.id
            );
            return (
              <SwiperSlide
                key={filter.id}
                className="!flex !w-fit items-center"
              >
                <motion.div
                  key={filter.id}
                  layout
                  whileHover={wobble}
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Badge
                    id="filter-badge"
                    hasClose
                    onClick={() => {
                      isAlreadySelected
                        ? removeFilter(filter)
                        : addFilter(filter);
                    }}
                    variant="outline"
                    className="shrink-0 cursor-pointer bg-primary"
                  >
                    {filter.name}
                  </Badge>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background" />
      </Swiper>
    </div>
  );
};

export default FiltersBadge;
