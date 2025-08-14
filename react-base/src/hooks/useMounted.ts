"use client";

import { useRef } from "react";

export const useMounted = (callback: () => void) => {
  const mounted = useRef(false);

  if (!mounted.current && typeof window !== "undefined") {
    mounted.current = true;
    callback();
  }

  return mounted.current;
};
