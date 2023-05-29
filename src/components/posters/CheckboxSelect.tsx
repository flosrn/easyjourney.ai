"use client";

import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Checkbox } from "~/components/ui/Checkbox";

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
    <div className="ml-2 mt-1">
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleToggleSelect}
        className="h-5 w-5"
      />
    </div>
  ) : null;
};

export default CheckboxSelect;
