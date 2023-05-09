import React from "react";

import AnimatedPosters from "~/components/AnimatedPosters";
import Header from "~/components/header/Header";
import { Button } from "~/components/ui/Button";

export default async function IndexPage() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <Header />
        <section className="flex items-center justify-center relative z-10 p-5 mx-auto bg-background rounded-lg mt-40 md:w-3/5 md:mt-52 xl:w-2/5 xl:mt-60">
          <div className="flex max-w-[980px] flex-col items-center gap-2">
            <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              myposter.ai
            </h1>
            <h2 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
              Generate beautiful posters in seconds with AI
            </h2>
            <p className="max-w-[700px] text-lg text-slate-700 dark:text-slate-400 sm:text-xl">
              myposter.ai is a free tool that uses AI to generate your own
              beautiful posters in seconds. Create it and print it, it's so
              easy, you will receive your poster in 3 days.
            </p>
            <Button href="/create">Create</Button>
          </div>
        </section>
        <div className="z-0 -mt-52">
          <AnimatedPosters />
        </div>
      </div>
    </>
  );
}
