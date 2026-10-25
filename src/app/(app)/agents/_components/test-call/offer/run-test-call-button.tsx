'use client';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

type RunTestCallButtonProps = {
  testable: boolean;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function RunTestCallButton({
  testable,
  disabled,
  onClick,
  children,
}: RunTestCallButtonProps) {
  if (!testable) return null;

  return (
    <Button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
