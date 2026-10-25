'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';

const COPIED_STATE_MS = 1500;

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      toast.error('The value was not copied. Copy it by hand.');
      return;
    }
    setIsCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setIsCopied(false), COPIED_STATE_MS);
  };

  return { isCopied, copy };
};
