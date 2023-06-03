"use client";

import type { Poster } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";

import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table/data-table-row-actions";

export const columns: ColumnDef<Poster>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "prompt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prompt" />
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
  },
  {
    accessorKey: "ratio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ratio" />
    ),
  },
  {
    accessorKey: "quality",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quality" />
    ),
  },
  {
    accessorKey: "style",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Style" />
    ),
  },
  {
    accessorKey: "stylize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stylize" />
    ),
  },
  {
    accessorKey: "chaos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chaos" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation date" />
    ),
  },
  // {
  //   accessorKey: "amount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Amount" />
  //   ),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);
  //
  //     return <div className="flex items-center font-medium">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "isPublic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="isPublic" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
