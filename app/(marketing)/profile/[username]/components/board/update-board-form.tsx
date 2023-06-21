"use client";

import React from "react";

import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { useBoardStore } from "../../../../store/boardStore";

const UpdateBoardForm = () => {
  const [
    boardIcon,
    boardName,
    boardDescription,
    boardIsPublic,
    setBoardIsPublic,
    setBoardForm,
  ] = useBoardStore((state) => [
    state.boardIcon,
    state.boardName,
    state.boardDescription,
    state.boardIsPublic,
    state.setBoardIsPublic,
    state.setBoardForm,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBoardForm(name, value);

    if (name === "boardName") {
      const slugValue = value.replaceAll(/\s+/g, "-").toLowerCase();
      setBoardForm("boardSlug", slugValue);
    }
  };

  const handleIsPublicChange = () => {
    setBoardIsPublic(!boardIsPublic);
  };

  return (
    <>
      <div className="mb-2 flex">
        <Label htmlFor="IsPublic" className="mr-2 text-left">
          Public :
        </Label>
        <Checkbox
          name="boardIsPublic"
          id="IsPublic"
          checked={boardIsPublic}
          onCheckedChange={handleIsPublicChange}
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor="boardIcon" className="mr-2">
          Icon :
        </Label>
        <Input
          id="boardIcon"
          name="boardIcon"
          placeholder="icon"
          value={boardIcon}
          required
          onChange={handleInputChange}
          className="w-[90%]"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor="boardName" className="mr-2">
          Name :
        </Label>
        <Input
          id="boardName"
          name="boardName"
          placeholder="name"
          value={boardName}
          required
          onChange={handleInputChange}
          className="w-[90%]"
        />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <Label htmlFor="boardDescription" className="mr-2">
          Description :
        </Label>
        <Input
          id="boardDescription"
          name="boardDescription"
          placeholder="description"
          value={boardDescription}
          required
          onChange={handleInputChange}
          className="w-[90%]"
        />
      </div>
    </>
  );
};

export default UpdateBoardForm;
