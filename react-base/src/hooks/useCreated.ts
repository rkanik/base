"use client";

import { useRef } from "react";

export const useCreated = (callback: () => void) => {
  const created = useRef(false);

  if (!created.current) {
    created.current = true;
    callback();
  }

  return created.current;
};
