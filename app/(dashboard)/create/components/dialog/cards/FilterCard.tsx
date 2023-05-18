import React from "react";
import Image from "next/image";

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
        <div className="line-clamp-4 h-20 p-2 text-left text-xs sm:h-[105px] sm:text-center md:p-3 md:text-sm">
          {description}
        </div>
      </div>
    </Card>
  );
};

export default FilterCard;
