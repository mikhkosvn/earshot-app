'use client';

import { Button } from '@/components/ui/button';

import { ProviderMoreToggleLabel } from './provider-more-toggle-label';

type ProviderMoreToggleProps = {
  expanded: boolean;
  onToggle: () => void;
};

export function ProviderMoreToggle({
  expanded,
  onToggle,
}: ProviderMoreToggleProps) {
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
