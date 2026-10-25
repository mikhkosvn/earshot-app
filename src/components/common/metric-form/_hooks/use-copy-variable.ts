'use client';

import { toast } from 'sonner';

export const useCopyVariable = () => async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
  } catch {
    toast.error('The value was not copied. Copy it by hand.');
    return;
  }
  toast.success(`Copied ${code}`);
};
