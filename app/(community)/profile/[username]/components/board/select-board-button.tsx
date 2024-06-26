"use client";

import React, { useState } from "react";
import { LucideBookPlus, LucideStepBack, PlusSquareIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Command, CommandInput } from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";

import CreateBoard from "./create-board";
import SelectBoard from "./select-board";

type SelectBoardButtonProps = {
  isSelectedPostersEmpty: boolean;
};

const SelectBoardButton = ({
  isSelectedPostersEmpty,
}: SelectBoardButtonProps) => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const toggleCreationForm = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(!openForm);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          disabled={isSelectedPostersEmpty}
          className="truncate"
        >
          <PlusSquareIcon className="mr-2 h-4 w-4" />
          Add to board
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="end"
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="w-screen p-0 md:w-72"
      >
        <Command>
          {!openForm && (
            <CommandInput placeholder="Search a board" className="text-md" />
          )}
          <ScrollArea className="h-80">
            {openForm ? (
              <CreateBoard onCloseHandler={handleClose} />
            ) : (
              <SelectBoard onCloseHandler={handleClose} />
            )}
          </ScrollArea>
          <Button onClick={toggleCreationForm} variant="outline">
            {openForm ? (
              <div className="flex items-center">
                <LucideStepBack className="mr-2" /> Back
              </div>
            ) : (
              <div className="flex items-center">
                <LucideBookPlus className="mr-2" />
                Create new board
              </div>
            )}
          </Button>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SelectBoardButton;
