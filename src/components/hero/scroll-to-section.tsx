"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "~/lib/classNames";

type ScrollToSectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const ScrollToSection = ({ id, children, className }: ScrollToSectionProps) => {
  const handleClick = () => {
    const section = document.querySelector(`#${id}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={{ translateY: -2 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: ["0%", "20%", "0%"],
        transition: {
          duration: 0.6,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          animationType: "ease-in-out",
        },
      }}
      onClick={handleClick}
      className={cn("p-2 opacity-50 hover:opacity-90", className)}
    >
      {children}
    </motion.button>
  );
};

export default ScrollToSection;
