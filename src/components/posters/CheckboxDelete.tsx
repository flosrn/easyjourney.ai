"use client";

import { useState } from "react";
import { useDeletePosterStore } from "~/store/deletePosterStore";

import { Checkbox } from "~/components/ui/Checkbox";

type CheckboxDeleteProps = {
  id: string;
};

export function CheckboxDelete({ id }: CheckboxDeleteProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const [selectedDeletePosters, addDeletePoster, removeDeletePoster] =
    useDeletePosterStore((state) => [
      state.selectedDeletePosters,
      state.addDeletePoster,
      state.removeDeletePoster,
    ]);

  const deletePosterHandler = () => {
    checked
      ? (removeDeletePoster(id), setChecked(false))
      : (addDeletePoster(id), setChecked(true));
    console.log("id :", id);
    console.log("selectedDeletePosters :", selectedDeletePosters);
    console.log("checked :", checked);
  };
  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={deletePosterHandler} />
    </div>
  );
}
