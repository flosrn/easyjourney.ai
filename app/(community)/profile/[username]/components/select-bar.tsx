"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelectBarStore } from "~/store/selectBarStore";
import { useSelectPosterStore } from "~/store/selectPosterStore";
import { motion } from "framer-motion";
import { InspectIcon, LucideX } from "lucide-react";

import RemoveFromBoardButton from "./board/remove-from-board-button";
import SelectBoardButton from "./board/select-board-button";
import DeleteButton from "./delete-button";

type SelectBarProps = {
  isValidUser?: boolean;
};

export const SelectBar = ({ isValidUser }: SelectBarProps) => {
  const pathname = usePathname();
  const [isModalSelectOpen, toggleModalSelectOpen, closeSelectBar] =
    useSelectBarStore((state) => [
      state.isSelectBarOpen,
      state.toggleSelectBar,
      state.closeSelectBar,
    ]);
  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );
  const boards = pathname?.includes("boards");
  const likes = pathname?.includes("likes");
  const isSelectedPostersEmpty = selectedPosters.length === 0;

  let numberOfPosters;
  if (selectedPosters.length === 0) {
    numberOfPosters = "No posters selected";
  } else if (selectedPosters.length === 1) {
    numberOfPosters = "1 poster selected";
  } else {
    numberOfPosters = `${selectedPosters.length} posters selected`;
  }

  const handleClose = () => {
    clearSelectedPosters();
    toggleModalSelectOpen();
  };

  useEffect(() => {
    clearSelectedPosters();
    closeSelectBar();
  }, [pathname]);

  return (
    <>
      {isModalSelectOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 0.25 }}
          className="fixed bottom-1 left-1/2 z-20 w-full md:bottom-5"
        >
          <div className="flex h-14 -translate-x-1/2 items-center justify-between rounded-lg bg-muted md:w-3/5 xl:w-2/5">
            <div className="ml-5 flex md:ml-2">
              <button
                className="hidden text-gray-400 md:inline-block"
                onClick={handleClose}
              >
                <LucideX className="mr-1 h-5" />
              </button>
              <div className="hidden md:block">{numberOfPosters}</div>
              <div className="flex items-center space-x-2 md:hidden">
                <InspectIcon className="h-4 w-4" />
                <span>{selectedPosters.length}</span>
              </div>
            </div>
            <div className="mr-5 flex">
              {!boards && !likes && isValidUser && (
                <DeleteButton isSelectedPostersEmpty={isSelectedPostersEmpty} />
              )}
              {!boards && (
                <SelectBoardButton
                  isSelectedPostersEmpty={isSelectedPostersEmpty}
                />
              )}
              {boards && isValidUser && (
                <RemoveFromBoardButton
                  isSelectedPostersEmpty={isSelectedPostersEmpty}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
