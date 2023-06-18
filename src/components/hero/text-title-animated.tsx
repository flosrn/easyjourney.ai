"use client";

import React from "react";
import { motion } from "framer-motion";

import BadgeAnimatedBorderGradient from "~/components/hero/badge-animated-border-gradient";
import TextAnimatedGradient from "~/components/hero/text-animated-gradient";
import { Button } from "~/components/ui/button";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

type TextTitleAnimatedProps = {};

const TextTitleAnimated = ({}: TextTitleAnimatedProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5,
          },
        },
      }}
    >
      <div className="relative">
        <motion.h1
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="text-center text-5xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
        >
          easyjourney.ai
        </motion.h1>
        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="mt-3 text-center md:absolute md:right-0 md:top-5 md:mt-0"
        >
          <BadgeAnimatedBorderGradient label="beta" />
        </motion.div>
      </div>

      <motion.p
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="mt-6 text-center md:text-2xl"
      >
        Unlock the power of{" "}
        <TextAnimatedGradient>Midjourney</TextAnimatedGradient> with a beautiful
        and user-friendly interface. Create stunning visuals with ease, no AI or
        prompt engineering expertise required
      </motion.p>

      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
      >
        <Button href="/posters/new" variant="secondary" className="mt-5">
          Explore
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TextTitleAnimated;
