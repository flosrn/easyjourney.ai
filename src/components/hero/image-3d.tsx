"use client";

import React from "react";
import Image from "next/image";
import Atropos from "atropos/react";

import "atropos/css";

type Image3DProps = {};

const Image3D = ({}: Image3DProps) => {
  return (
    <Atropos
      highlight={false}
      rotateTouch={false}
      innerClassName="rounded-xl ring-1 ring-border/60 bg-background"
      className="w-[48rem] max-w-none rounded-xl shadow-[0px_61.366004943847656px_155.088623046875px_-23.43065643310547px_rgba(137,90,246,0.13)] md:-ml-4 xl:-ml-24"
    >
      <Image
        data-atropos-offset="2"
        src="/images/landingpage/hero/main_background.png"
        alt="Easyjourney Product screenshot"
        width={2704}
        height={2030}
      />
      <Image
        data-atropos-offset="4"
        src="/images/landingpage/hero/astronaute.png"
        alt="Easyjourney Product screenshot"
        width={2704}
        height={2030}
        className="absolute left-0 top-0 h-full w-full"
      />
      <Image
        data-atropos-offset="3"
        src="/images/landingpage/hero/generate.png"
        alt="Easyjourney Product screenshot"
        width={2704}
        height={2030}
        className="absolute left-0 top-0 h-full w-full"
      />
      <Image
        data-atropos-offset="3"
        src="/images/landingpage/hero/ratio.png"
        alt="Easyjourney Product screenshot"
        width={2704}
        height={2030}
        className="absolute left-0 top-0 h-full w-full"
      />
      <Image
        data-atropos-offset="3"
        src="/images/landingpage/hero/save.png"
        alt="Easyjourney Product screenshot"
        width={2704}
        height={2030}
        className="absolute left-0 top-0 h-full w-full"
      />
    </Atropos>
  );
};

export default Image3D;
