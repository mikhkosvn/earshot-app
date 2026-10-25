'use client';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { useIsSavingMonitor } from '../_hooks/use-is-saving-monitor';

interface MonitorSubmitButtonProps {
  children: ReactNode;
}

export function MonitorSubmitButton({ children }: MonitorSubmitButtonProps) {
  const isSaving = useIsSavingMonitor();

  return (
    <Button type="submit" className="w-full" disabled={isSaving}>
      {children}
    </Button>
  );
}
