"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import BadgeAnimatedBorderGradient from "~/components/hero/badge-animated-border-gradient";

import logoBlack from "../../../public/images/logo/easyjourney_logo_black.svg";
import logoWhite from "../../../public/images/logo/easyjourney_logo.svg";

type FooterLogoProps = {};

const FooterLogo = ({}: FooterLogoProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="relative mb-8 w-2/3 md:mb-16 md:w-96">
      <Image
        src={isDarkTheme ? logoWhite : logoBlack}
        alt="Easyjourney.ai"
        className=""
      />
      <div className="absolute -right-16 top-4 text-center">
        <BadgeAnimatedBorderGradient label="beta" />
      </div>
    </div>
  );
};

export default FooterLogo;
