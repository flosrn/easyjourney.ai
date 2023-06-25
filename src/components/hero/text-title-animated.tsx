"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import BadgeAnimatedBorderGradient from "~/components/hero/badge-animated-border-gradient";
import TextAnimatedGradient from "~/components/hero/text-animated-gradient";
import { Button } from "~/components/ui/button";

import logoBlack from "../../../public/images/logo/easyjourney_logo_black.svg";
import logoWhite from "../../../public/images/logo/easyjourney_logo.svg";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

type TextTitleAnimatedProps = {};

const TextTitleAnimated = ({}: TextTitleAnimatedProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
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
          <Image
            priority
            src={isDarkTheme ? logoWhite : logoBlack}
            alt="Easyjourney.ai"
          />
        </motion.h1>
        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="mt-3 text-center md:absolute md:-right-16 md:top-12 md:mt-0"
        >
          <BadgeAnimatedBorderGradient label="beta" />
        </motion.div>
      </div>

      <motion.p
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="mt-6 px-8 text-center text-lg sm:text-xl md:text-2xl"
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
        <Button asChild variant="secondary" className="mt-5">
          <Link href="/posters/new">Explore</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default TextTitleAnimated;
