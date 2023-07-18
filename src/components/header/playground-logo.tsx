import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import logoBlack from "../../../public/images/logo/flyingfish_black.svg";
import logoWhite from "../../../public/images/logo/flyingfish_white.svg";

const PlaygroundLogo = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Image
        priority
        src={logoWhite}
        alt="Easyjourney.ai"
        className="h-7 w-7"
      />
    );

  return (
    <Image
      priority
      src={isDarkTheme ? logoWhite : logoBlack}
      alt="Easyjourney.ai"
      className="h-7 w-7"
    />
  );
};

export default PlaygroundLogo;
