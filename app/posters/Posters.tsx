import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "~/server/db/prisma";

type PostersProps = {
  userId?: string;
};

const Posters = async ({ userId }: PostersProps) => {
  let posters = [];

  posters = await (userId
    ? prisma.poster.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { user: true },
      })
    : prisma.poster.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true },
      }));

  return (
    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posters.length > 0 &&
        posters.map((poster) => (
          <Link
            key={poster.id}
            href={`/posters/${poster.id}`}
            className="w-[150px]"
          >
            <Image
              alt={poster.prompt}
              src={poster.image}
              width="150"
              height="150"
              className="rounded-lg transition duration-200 ease-in-out hover:scale-105"
            />
            <div className="mt-1 text-gray-500">
              <p className="truncate text-xs font-medium text-gray-600">
                {poster.prompt}
              </p>

              <p className="text-[11px]">
                by{" "}
                <Link href={`/`} className="text-gray-300">
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  {poster.user.name}
                </Link>
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Posters;
