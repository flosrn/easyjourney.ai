"use client";

import React, { useCallback } from "react";
import { Particles } from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

type StarsParticlesProps = {};

const StarsParticles = ({}: StarsParticlesProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // @ts-expect-error - no types for this
    return await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false, zIndex: 0 },
        background: {
          color: { value: "hsl(224 71% 4%)" },
        },
        particles: {
          number: {
            value: 100,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.2,
            straight: false,
          },
          opacity: {
            animation: {
              enable: true,
              speed: 1,
              sync: false,
            },
            value: { min: 0, max: 1 },
          },
          size: {
            value: { min: 0.2, max: 1.5 },
          },
        },
        // emitters: {
        //   direction: "top",
        //   life: { count: 1, duration: 0.1, delay: 0.1 },
        //   rate: { quantity: 1, delay: 20 },
        //   // life: { count: 1, duration: 0.1, delay: 0.1 },
        //   position: { x: 50, y: 100 },
        //   particles: {
        //     shape: { type: "line" },
        //     stroke: {
        //       color: {
        //         value: "#ffffff",
        //       },
        //       width: 150,
        //       opacity: 1,
        //     },
        //     size: { value: 0.3 },
        //     rotate: {
        //       path: true,
        //       value: 90,
        //     },
        //     color: { value: "#ffffff" },
        //     move: {
        //       straight: true,
        //       enable: true,
        //       speed: 40,
        //       direction: { min: 180, max: 180, random: false },
        //     },
        //   },
        // },
      }}
      init={particlesInit}
    />
  );
};

export default StarsParticles;
