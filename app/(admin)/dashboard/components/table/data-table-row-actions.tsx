"use client";

import React from "react";
import type { Poster } from "@prisma/client";
import type { Row } from "@tanstack/react-table";
import {
  CopyIcon,
  EyeIcon,
  MoreHorizontal,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { useDialogStore } from "../../store/dialogStore";

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
};

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const poster = row.original as Poster;
  const setIsDialogOpen = useDialogStore((state) => state.setIsDialogOpen);

  const handleViewPoster = () => {
    setIsDialogOpen(true);
  };

  const handleCopyJobId = async (event: React.MouseEvent) => {
    event.preventDefault();
    await navigator.clipboard.writeText(poster.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleViewPoster}>
          <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyJobId}>
          <CopyIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Copy JobId
        </DropdownMenuItem>
        <DropdownMenuItem>
          <StarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/*<DropdownMenuSub>*/}
        {/*  <DropdownMenuSubTrigger>*/}
        {/*    <Tags className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />*/}
        {/*    Labels*/}
        {/*  </DropdownMenuSubTrigger>*/}
        {/*  <DropdownMenuSubContent>*/}
        {/*    <DropdownMenuRadioGroup value={task.label}>*/}
        {/*      {labels.map((label) => (*/}
        {/*        <DropdownMenuRadioItem key={label.value} value={label.value}>*/}
        {/*          {label.label}*/}
        {/*        </DropdownMenuRadioItem>*/}
        {/*      ))}*/}
        {/*    </DropdownMenuRadioGroup>*/}
        {/*  </DropdownMenuSubContent>*/}
        {/*</DropdownMenuSub>*/}
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem>
          <TrashIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
