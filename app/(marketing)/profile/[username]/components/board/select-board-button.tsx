"use client";

import React, { useState } from "react";
import { LucideBookPlus, LucideStepBack } from "lucide-react";

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

const SelectBoardButton = () => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const toggleCreationForm = () => {
    openForm ? setOpenForm(false) : setOpenForm(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" role="combobox" aria-expanded={open}>
          Select a board
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          {!openForm && <CommandInput placeholder="Search a board" />}
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
