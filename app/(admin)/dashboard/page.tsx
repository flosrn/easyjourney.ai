import React from "react";
import type { Poster } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import { columns } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";

const getPosters = async (): Promise<Poster[]> =>
  await prisma.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { user: true, likes: true },
  });

export default async function DashboardOption2Page() {
  const data = await getPosters();

  return <DataTable columns={columns} data={data} />;
}
