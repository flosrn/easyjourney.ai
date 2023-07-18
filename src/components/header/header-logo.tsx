import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import fullLogoBlack from "../../../public/images/logo/easyjourney_logo_black.svg";
import fullLogoWhite from "../../../public/images/logo/easyjourney_logo.svg";
import logoBlack from "../../../public/images/logo/flyingfish_black.svg";
import logoWhite from "../../../public/images/logo/flyingfish_white.svg";

type HeaderLogoProps = {};

const HeaderLogo = ({}: HeaderLogoProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Link href="/" className="mr-2 flex items-center space-x-2 -md:-ml-3">
        <Image
          priority
          src={fullLogoWhite}
          alt="Easyjourney.ai"
          className="mb-3 h-8 w-full -md:hidden"
        />
      </Link>
    );

  return (
    <Link href="/" className="mr-2 flex  items-center space-x-2 -md:-ml-3">
      <Image
        priority
        src={isDarkTheme ? fullLogoWhite : fullLogoBlack}
        alt="Easyjourney.ai"
        className="mb-3 h-8 w-full -md:hidden"
      />
      <Image
        priority
        src={isDarkTheme ? logoWhite : logoBlack}
        alt="Easyjourney.ai"
        className="h-8 w-8 md:hidden"
      />
    </Link>
  );
};

export default HeaderLogo;
