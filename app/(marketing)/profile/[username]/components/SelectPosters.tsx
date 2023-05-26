"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import DeleteButton from "~/../app/(marketing)/profile/[username]/components/DeleteButton";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Button } from "~/components/ui/Button";

export const ButtonSelectPosters = () => {
  const [toggleSelectPostersOpen, isSelectPostersOpen] = useSelectPosterStore(
    (state) => [state.toggleSelectPostersOpen, state.isSelectModalOpen]
  );

  const openSelect = () => toggleSelectPostersOpen();

  return (
    <button
      onClick={openSelect}
      className={`mt-4 flex content-center rounded-full px-4 py-2${
        isSelectPostersOpen ? " bg-blue-500" : " bg-gray-300 text-black"
      }`}
    >
      <MousePointerClick
        className={` m-auto mr-2 h-4 w-4 self-center${
          isSelectPostersOpen && "text-black"
        }`}
      />
      Select Images
    </button>
  );
};

export const SelectPosters = () => {
  const [
    isSelectPostersOpen,
    selectedPosters,
    clearSelectedPosters,
    toggleSelectPostersOpen,
  ] = useSelectPosterStore((state) => [
    state.isSelectModalOpen,
    state.selectedPosters,
    state.clearSelectedPosters,
    state.toggleSelectPostersOpen,
  ]);

  const handleClose = () => {
    clearSelectedPosters();
    toggleSelectPostersOpen();
  };
  return (
    <>
      {isSelectPostersOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          style={{ position: "fixed", bottom: "20px", left: "50%" }}
        >
          <div className="flex h-14 w-[40vw] -translate-x-1/2 items-center justify-between rounded-lg bg-muted">
            <div>
              <Button
                variant="ghost"
                className=" mr-2 h-5 w-5 rounded-full text-gray-400"
                onClick={handleClose}
              >
                x
              </Button>
              {selectedPosters.length} Posters selected
            </div>
            <div className=" mr-2">
              <DeleteButton />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
