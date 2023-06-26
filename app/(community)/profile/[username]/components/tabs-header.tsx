"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSelectBarStore } from "~/store/selectBarStore";
import { BookMarkedIcon, HeartIcon, StarIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { cn } from "~/lib/classNames";

import SelectButton from "./select-button";

type TabsHeaderProps = {
  username: string;
  isValidUser?: boolean;
};

const getTabsValue = (pathname: string | null) => {
  switch (true) {
    case pathname?.includes("likes"):
      return "liked";
    case pathname?.includes("boards"):
      return "boards";
    default:
      return "created";
  }
};

const AbsolutePositionedSelectButton = ({
  isSelectBarOpen,
  className,
}: {
  isSelectBarOpen: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "fixed right-2 md:right-5 z-50 bottom-2 md:bottom-2",
      {
        "bottom-16": isSelectBarOpen,
      },
      className
    )}
  >
    <SelectButton rounded />
  </div>
);

const TabsHeader = ({ username, isValidUser }: TabsHeaderProps) => {
  const isSelectBarOpen = useSelectBarStore((state) => state.isSelectBarOpen);
  const { boardId } = useParams() ?? {};
  const pathname = usePathname();

  const value = getTabsValue(pathname);
  const isNew = value === "created";
  const isFavorite = value === "liked";
  const isBoard = value === "boards" && !!boardId;
  const showSelectButton = isNew || isFavorite || isBoard;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div className="my-4 flex items-center justify-between space-x-3">
      <Tabs ref={ref} value={value} className="w-[300px]">
        <TabsList className="w-full">
          <Link href={`/profile/${username}`} className="w-1/3">
            <TabsTrigger value="created" className="w-full">
              <StarIcon className="mr-2 h-5 w-5 shrink-0" />
              New
            </TabsTrigger>
          </Link>
          <Link href={`/profile/${username}/likes`} className="w-1/3">
            <TabsTrigger value="liked" className="w-full">
              <HeartIcon className="mr-2 h-5 w-5 shrink-0" />
              Favorite
            </TabsTrigger>
          </Link>
          <Link href={`/profile/${username}/boards`} className="w-1/3">
            <TabsTrigger value="boards" className="w-full">
              <BookMarkedIcon className="mr-2 h-5 w-5 shrink-0" />
              Boards
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      {showSelectButton && (
        <>
          {!inView && (
            <AbsolutePositionedSelectButton isSelectBarOpen={isSelectBarOpen} />
          )}
          <AbsolutePositionedSelectButton
            isSelectBarOpen={isSelectBarOpen}
            className="sm:hidden"
          />
          {isValidUser && (
            <div className="flex text-center -sm:hidden">
              <SelectButton />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TabsHeader;
