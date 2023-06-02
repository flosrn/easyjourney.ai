"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelectBarStore } from "~/store/selectBarStore";

const NavigationEvents = () => {
  const pathname = usePathname();
  const [isModalSelectOpen, closeSelectBar] = useSelectBarStore((state) => [
    state.isSelectBarOpen,
    state.closeSelectBar,
  ]);

  useEffect(() => {
    const isNotProfilePage = !pathname?.includes("profile");
    if (isModalSelectOpen && isNotProfilePage) {
      closeSelectBar();
    }
  }, [pathname, isModalSelectOpen, closeSelectBar]);

  return null;
};

export default NavigationEvents;
