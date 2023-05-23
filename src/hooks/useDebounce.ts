/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { useRef } from "react";

const useDebounce = (
  fn: (...args: any[]) => any,
  delay: number,
  firstCallImmediate = true
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const firstCallRef = useRef<boolean>(firstCallImmediate);

  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (firstCallRef.current) {
      fn(...args);
      firstCallRef.current = false;
      return;
    }

    timeoutRef.current = setTimeout(() => fn(...args), delay);
  };
};

export default useDebounce;
