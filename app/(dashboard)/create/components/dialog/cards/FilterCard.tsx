import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Card } from "~/components/ui/Card";
import { Separator } from "~/components/ui/Separator";

import { cn } from "~/lib/classNames";

import type { Filter } from "../../../data/filter/typeFilters";

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
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.93 }}>
      <Card
        onClick={() => clickHandler(filter)}
        className={cn("cursor-pointer", {
          "outline outline-1 outline-offset-2 outline-blue-500": isActive,
        })}
      >
        <div className="md:text-md truncate px-3 py-2 text-center text-sm font-bold">
          {name}
        </div>
        <Separator />
        <div className="flex flex-row sm:flex-col">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            placeholder="blur"
            blurDataURL={image}
            className="h-20 w-20 shrink-0 rounded-bl-lg bg-left sm:h-full sm:w-full md:block md:rounded-none"
          />
          <div className="h-20 p-2 text-left text-xs sm:h-[125px] sm:text-center md:p-3 md:text-sm">
            <span className="line-clamp-5">{description}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FilterCard;
