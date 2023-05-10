import React from "react";

import { Button } from "~/components/ui/Button";

import type { Hero } from "~/types/nav";

type TitleProps = Hero;

const Title = ({ title, subtitle, description }: TitleProps) => (
  <div className="flex-center bg-background/80 absolute inset-0 z-10 backdrop-blur-[2px]">
    <section className="flex max-w-2xl flex-col items-center gap-2 space-y-2 px-5">
      <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <h2 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
        {subtitle}
      </h2>
      <p className="text-center text-lg text-slate-700 dark:text-slate-400">
        {description}
      </p>
      <Button href="/posters/new" className="mt-5">
        Explore
      </Button>
    </section>
  </div>
);

export default Title;
