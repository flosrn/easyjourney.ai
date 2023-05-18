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
      className={cn("flex flex-col md:m-3 m-1 w-full md:w-1/6 cursor-pointer", {
        "outline outline-1 outline-offset-2 outline-blue-500": isActive,
      })}
    >
      <div className="p-1 text-center text-base font-bold md:p-3">{name}</div>
      <Separator />
      <div className="flex flex-row md:flex-col">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={image}
          className="w-1/5 rounded-bl-lg bg-left md:block md:w-full md:rounded-none"
        />
        <div className="w-4/5 p-2 text-center md:w-full md:p-3">
          {description}
        </div>
      </div>
    </Card>
  );
};

export default FilterCard;
