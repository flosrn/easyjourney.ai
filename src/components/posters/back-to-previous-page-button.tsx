"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ChevronLeftIcon } from "lucide-react";

type BackToPreviousPageButtonProps = {};

const BackToPreviousPageButton = ({}: BackToPreviousPageButtonProps) => {
  const router = useRouter();
  return (
    <div className="mb-5">
      <button
        onClick={() => router.back()}
        className="group relative flex cursor-pointer items-center"
      >
        <ChevronLeftIcon className="absolute mr-2 h-5 w-5 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0" />
        <ArrowLeftIcon className="absolute left-[4px] mr-2 h-5 w-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        <span className="ml-6 cursor-pointer transition-all duration-300 ease-in-out group-hover:ml-8">
          Back
        </span>
      </button>
    </div>
  );
};

export default BackToPreviousPageButton;
