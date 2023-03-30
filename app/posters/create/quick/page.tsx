import React from "react";
import Link from "next/link";
import { getSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import Prompt from "~/components/Prompt";

export default async function CreatePage() {
  const session = await getSession();
  const posters = await prisma.poster.findMany({
    where: { userId: session?.user.id },
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
        <div className="flex max-w-[980px] flex-col items-center gap-2">
          <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Homaide.art
          </h1>
          <h2 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
            Generate beautiful posters in seconds with AI
          </h2>
          <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
            Homaide.art is a free tool that uses AI to generate your own
            beautiful posters in seconds. Create it and print it, it's so easy,
            you will receive your poster in 3 days.
          </p>
        </div>
        <Prompt />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posters.map((poster) => (
            <Link key={poster.id} href={`/posters/${poster.id}`}>
              <img
                src={`data:image/png;base64,${poster.image}`}
                alt=""
                className="h-auto w-full"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
