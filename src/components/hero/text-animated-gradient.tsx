import React from "react";

type TextAnimatedGradientProps = {
  children: React.ReactNode;
};

const TextAnimatedGradient = ({ children }: TextAnimatedGradientProps) => {
  return (
    <span className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent">
      {children}
    </span>
  );
};

export default TextAnimatedGradient;
