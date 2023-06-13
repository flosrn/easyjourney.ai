"use Client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

type BoardPreviewProps = {
  boardId: string;
  name: string;
  icon?: string | null;
  isPublic: boolean;
  collection: number;
  isUserBoard: boolean;
};

const fetchBoardCover = async (boardId: string) => {
  const response = await fetch(`/api/boards/${boardId}/cover`);
  return response.json();
};

const BoardPreview = ({
  boardId,
  name,
  icon,
  collection,
}: BoardPreviewProps) => {
  const {
    isPending,
    isError,
    data: poster,
  } = useQuery({
    queryKey: ["cover", boardId],
    queryFn: async () => fetchBoardCover(boardId),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="flex w-full flex-col rounded-xl ring-2 ring-offset-card hover:ring-offset-highlight">
      <div className="flex h-10 w-full items-center truncate px-2">
        <div className="mr-2 w-6 rounded-xl text-center ring">{collection}</div>
        <div>
          {icon} {name}
        </div>
      </div>
      <Image
        src={poster.image}
        alt={poster.prompt}
        width={poster.width ?? 500}
        height={poster.height ?? 500}
        className="w-full rounded-b-xl"
      />
    </div>
  );
};

export default BoardPreview;
