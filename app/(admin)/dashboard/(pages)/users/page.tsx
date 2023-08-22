import React from "react";
import type { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

import { columns } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";

const getUsers = async (): Promise<User[]> =>
  await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

export default async function DashboardOption2Page() {
  const data = await getUsers();

  return <DataTable columns={columns} data={data} />;
}
