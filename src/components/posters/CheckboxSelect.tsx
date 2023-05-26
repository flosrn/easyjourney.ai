"use client";

import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Checkbox } from "~/components/ui/Checkbox";

type CheckboxDeleteProps = {
  id: string;
};

const CheckboxSelect = ({ id }: CheckboxDeleteProps) => {
  const [isSelectModalOpen, selectedPosters, addPoster, removePoster] =
    useSelectPosterStore((state) => [
      state.isSelectModalOpen,
      state.selectedPosters,
      state.addPoster,
      state.removePoster,
    ]);

  const isSelected = selectedPosters.find((posterId) => posterId === id);

  const handleToggleSelect = () => {
    console.log("id :", id);
    isSelected ? removePoster(id) : addPoster(id);
  };

  return isSelectModalOpen ? (
    <div className="flex items-center space-x-2">
      <Checkbox checked={!!isSelected} onCheckedChange={handleToggleSelect} />
    </div>
  ) : null;
};

export default CheckboxSelect;
