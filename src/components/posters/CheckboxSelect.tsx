"use client";

import { useModalSelectStore } from "~/../app/(marketing)/profile/store/modalSelectPostersStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Checkbox } from "~/components/ui/Checkbox";

type CheckboxDeleteProps = {
  id: string;
};

const CheckboxSelect = ({ id }: CheckboxDeleteProps) => {
  const isModalSelectOpen = useModalSelectStore(
    (state) => state.isModalSelectOpen
  );

  const [selectedPosters, addPoster, removePoster] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.addPoster, state.removePoster]
  );

  const isSelected = selectedPosters.find((posterId) => posterId === id);

  const handleToggleSelect = () => {
    isSelected ? removePoster(id) : addPoster(id);
  };

  return isModalSelectOpen ? (
    <div className="flex items-center space-x-2">
      <Checkbox
        className=" rounded-full data-[state=checked]:border-white"
        checked={!!isSelected}
        onCheckedChange={handleToggleSelect}
      />
    </div>
  ) : null;
};

export default CheckboxSelect;
