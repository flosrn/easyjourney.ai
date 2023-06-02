"use client";

import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Checkbox } from "~/components/ui/checkbox";

import { cn } from "~/lib/classNames";

type CheckboxDeleteProps = {
  id: string;
};

const CheckboxSelect = ({ id }: CheckboxDeleteProps) => {
  const isSelectBarOpen = useSelectBarStore((state) => state.isSelectBarOpen);
  const [selectedPosters, addPoster, removePoster] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.addPoster, state.removePoster]
  );

  const isSelected = selectedPosters.includes(id);

  const handleToggleSelect = () =>
    isSelected ? removePoster(id) : addPoster(id);

  return isSelectBarOpen ? (
    <div
      onClick={handleToggleSelect}
      className={cn("absolute inset-0 z-10 cursor-pointer", {
        "hover:bg-background/20": !isSelected,
      })}
    >
      <Checkbox checked={isSelected} className="m-2 h-5 w-5" />
    </div>
  ) : null;
};

export default CheckboxSelect;
