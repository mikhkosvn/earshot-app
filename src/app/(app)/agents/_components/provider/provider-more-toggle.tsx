'use client';

import { Button } from '@/components/ui/button';

import { ProviderMoreToggleLabel } from './provider-more-toggle-label';

interface ProviderMoreToggleProps {
  canExpand: boolean;
  expanded: boolean;
  onToggle: () => void;
}

export function ProviderMoreToggle({
  canExpand,
  expanded,
  onToggle,
}: ProviderMoreToggleProps) {
  if (!canExpand) return null;
  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className="self-center text-muted-foreground"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <ProviderMoreToggleLabel expanded={expanded} />
    </Button>
  );
}
