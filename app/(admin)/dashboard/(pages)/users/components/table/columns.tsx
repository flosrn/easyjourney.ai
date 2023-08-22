"use client";

import Image from "next/image";
import type { User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";

import { DataTableColumnHeader } from "../../../../components/table/data-table-column-header";
import { DataTableRowActions } from "../../../../components/table/data-table-row-actions";
import { dateOptions } from "../../../../data/data";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const prompt = row.getValue("prompt") as string;
      return (
        <div className="flex-center">
          <Image
            src={image}
            alt={prompt}
            width={30}
            height={30}
            quality={50}
            unoptimized
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div>
          {new Date(createdAt).toLocaleDateString("fr-FR", dateOptions)}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
