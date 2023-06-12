import React from "react";

import BadgeAnimatedBorderGradient from "~/components/hero/badge-animated-border-gradient";
import TextAnimatedGradient from "~/components/hero/text-animated-gradient";
import { Button } from "~/components/ui/button";

import type { Hero } from "~/types/nav";

type TitleProps = Hero;

const Title = ({ title, subtitle }: TitleProps) => (
  <div className="flex-center absolute inset-0 z-10 mt-7 bg-gradient-radial from-background/95 via-background/60 to-background/5 backdrop-blur-[1.5px]">
    <section className="flex max-w-2xl flex-col items-center gap-2 space-y-2 px-5">
      <div className="relative">
        <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="absolute -right-16 top-2">
          <BadgeAnimatedBorderGradient label="beta" />
        </div>
      </div>
      <h2 className="text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-4xl">
        {subtitle}
      </h2>
      <p className="text-center text-lg text-slate-700 dark:text-slate-400">
        Unlock the power of{" "}
        <TextAnimatedGradient>Midjourney</TextAnimatedGradient> with a beautiful
        and user-friendly interface. Create stunning visuals with ease, no AI or
        prompt engineering expertise required
      </p>
      <Button href="/posters/new" variant="secondary" className="mt-5">
        Explore
      </Button>
    </section>
  </div>
);

export default Title;
