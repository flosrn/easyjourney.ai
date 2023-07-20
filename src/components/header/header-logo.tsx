"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { cn } from "~/lib/classNames";

import logoBlackDesktop from "../../../public/images/logo/easyjourney_logo_black.svg";
import logoWhiteDesktop from "../../../public/images/logo/easyjourney_logo.svg";
import logoBlackMobile from "../../../public/images/logo/flyingfish_black.svg";
import logoWhiteMobile from "../../../public/images/logo/flyingfish_white.svg";

type HeaderLogoProps = {
  isMobile?: boolean;
  className?: string;
};

const HeaderLogo = ({ isMobile, className }: HeaderLogoProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const logoWhite = isMobile ? logoWhiteMobile : logoWhiteDesktop;
  const logoBlack = isMobile ? logoBlackMobile : logoBlackDesktop;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Image
        priority
        src={logoWhite}
        alt="Easyjourney.ai"
        className={cn("h-8 w-full", className)}
      />
    );

  return (
    <Image
      priority
      src={isDarkTheme ? logoWhite : logoBlack}
      alt="Easyjourney.ai"
      className={cn("h-8 w-full", className)}
    />
  );
};

export default HeaderLogo;
