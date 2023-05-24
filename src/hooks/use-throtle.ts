/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

type CallbackFn = (...args: any[]) => void;

function useThrottle(fn: CallbackFn, delay: number): CallbackFn {
  const lastCallRef = useRef<number | null>(null);
  const deferredCallRef = useRef<ReturnType<typeof setTimeout>>();
  const pendingArgsRef = useRef<any[] | null>(null);

  const executeCall = useCallback(
    (args: any[]) => {
      fn(...args);
      lastCallRef.current = Date.now();
      pendingArgsRef.current = null;
    },
    [fn]
  );

  return useCallback(
    function (...args: any[]) {
      if (lastCallRef.current === null) {
        executeCall(args);
      } else {
        const now = Date.now();
        if (now - lastCallRef.current > delay) {
          executeCall(args);
        } else {
          pendingArgsRef.current = args;
          clearTimeout(deferredCallRef.current);
          deferredCallRef.current = setTimeout(() => {
            if (pendingArgsRef.current) {
              executeCall(pendingArgsRef.current);
            }
          }, delay);
        }
      }
    },
    [delay, executeCall]
  );
}

export default useThrottle;
