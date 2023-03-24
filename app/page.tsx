import React from "react";

import HeroAnimateIcons from "~/components/HeroAnimateIcons";
import { Button } from "~/components/ui/Button";

export default async function IndexPage() {
  return (
    <>
      <section className="container grid items-center justify-center gap-6 pb-8">
        <HeroAnimateIcons />
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
          <Button variant="outline" href="/create">
            Get Started
          </Button>
        </div>
      </section>
    </>
  );
}
