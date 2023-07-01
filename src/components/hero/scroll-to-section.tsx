"use client";

import React from "react";
import { motion } from "framer-motion";

type ScrollToSectionProps = {
  id: string;
  children: React.ReactNode;
};

const ScrollToSection = ({ id, children }: ScrollToSectionProps) => {
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
      className="p-2 opacity-70 hover:opacity-90"
    >
      {children}
    </motion.button>
  );
};

export default ScrollToSection;
