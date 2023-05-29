"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideX, LucideXCircle, MousePointerClick } from "lucide-react";
import DeleteButton from "~/../app/(marketing)/profile/[username]/components/DeleteButton";
import { useSelectPosterStore } from "~/store/selectPosterStore";

import { Button } from "~/components/ui/Button";

import { useModalSelectStore } from "../../store/modalSelectPostersStore";

export const ButtonSelectPosters = () => {
  const [isModalSelectOpen, toggleModalSelectOpen] = useModalSelectStore(
    (state) => [state.isModalSelectOpen, state.toggleModalSelectOpen]
  );

  const clearSelectedPosters = useSelectPosterStore(
    (state) => state.clearSelectedPosters
  );

  const toggleModal = () =>
    isModalSelectOpen
      ? (clearSelectedPosters(), toggleModalSelectOpen())
      : toggleModalSelectOpen();

  return (
    <button
      onClick={toggleModal}
      className={`m-auto mt-4 flex rounded-md px-4 py-2 ${
        isModalSelectOpen ? " bg-blue-500" : " bg-gray-300 text-black"
      }`}
    >
      <MousePointerClick
        className={` m-auto mr-2 h-4 w-4 ${isModalSelectOpen && "text-black"}`}
      />
      Select Images
    </button>
  );
};

export const SelectPosters = () => {
  const [isModalSelectOpen, toggleModalSelectOpen] = useModalSelectStore(
    (state) => [state.isModalSelectOpen, state.toggleModalSelectOpen]
  );

  const [selectedPosters, clearSelectedPosters] = useSelectPosterStore(
    (state) => [state.selectedPosters, state.clearSelectedPosters]
  );

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
  return (
    <>
      {isModalSelectOpen && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="fixed bottom-[-5px] left-1/2 z-20 w-screen md:bottom-5"
        >
          <div className="flex h-14 -translate-x-1/2 items-center justify-between rounded-lg bg-muted md:w-3/5 xl:w-2/5 ">
            <div className="ml-5 flex md:ml-2">
              <button
                className="hidden text-gray-400 md:inline-block"
                onClick={handleClose}
              >
                <LucideX
                  className="h-4/6 w-auto"
                />
              </button>
              <div>{numberOfPosters}</div>
            </div>
            <div className=" mr-2 flex">
              <DeleteButton />
              <Button
                variant="secondary"
                className="ml-2"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
