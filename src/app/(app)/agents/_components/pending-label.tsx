import type { ReactNode } from 'react';

type PendingLabelProps = {
  pending: boolean;
  pendingText: string;
  children: ReactNode;
};

export function PendingLabel({
  pending,
  pendingText,
  children,
}: PendingLabelProps) {
  if (pending) return pendingText;
  return children;
}
