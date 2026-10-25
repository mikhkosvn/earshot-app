'use client';

import { useEffect, useRef } from 'react';

export const usePrintOnce = () => {
  const printed = useRef(false);

  useEffect(() => {
    if (printed.current) return;
    printed.current = true;
    window.print();
  }, []);
};
