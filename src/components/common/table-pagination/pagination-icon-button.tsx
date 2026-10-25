'use client';

import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationIconButtonProps {
  icon: LucideIcon;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export function PaginationIconButton({
  icon: Icon,
  label,
  disabled,
  onClick,
}: PaginationIconButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="unstyled"
      aria-label={label}
      disabled={disabled}
      className="size-6.5 rounded-md bg-background"
      onClick={onClick}
    >
      <Icon className="size-3" />
    </Button>
  );
}
