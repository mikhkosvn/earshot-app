import type { ReactNode } from 'react';

type ResultCountChipProps = {
  children: ReactNode;
};

export function ResultCountChip({ children }: ResultCountChipProps) {
  return (
    <span className="inline-flex h-5 min-w-8 items-center justify-center rounded-full border px-2 font-medium">
      {children}
    </span>
  );
}
