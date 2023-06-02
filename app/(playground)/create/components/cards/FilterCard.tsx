import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import type { Filter } from "../../types/typeFilters";

type FilterCardProps = Filter & {
  isActive: boolean;
  clickHandler: (filter: Filter) => void;
};

const FilterCard = ({
  id,
  name,
  image,
  style,
  description,
  clickHandler,
  isActive,
}: FilterCardProps) => {
  const filter = { id, name, image, style, description };
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
      <Card
        onClick={() => clickHandler(filter)}
        className={cn("cursor-pointer", {
          "outline outline-1 outline-offset-2 outline-highlight": isActive,
        })}
      >
        <div className="text-md hidden truncate px-3 py-2 font-bold sm:block">
          {name}
        </div>
        <div className="flex flex-row sm:flex-col">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            placeholder="blur"
            blurDataURL={image}
            className="h-24 w-24 shrink-0 rounded-l-md bg-left sm:h-full sm:w-full sm:rounded-none md:block"
          />
          <div className="w-full">
            <div className="truncate px-3 py-2 text-sm font-bold sm:hidden">
              {name}
            </div>
            <Separator className="sm:hidden" />
            <div className="h-10 px-3 py-2 text-left text-xs sm:h-[125px] md:text-sm">
              <span className="line-clamp-2 sm:line-clamp-5">
                {description}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FilterCard;
