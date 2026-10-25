'use client';

import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ResultsView } from '@/lib/url-generator/constants';

import { useResultsViewParam } from '../../../_hooks/results-list/use-results-view-param';

type ResultsViewToggleButtonProps = {
  target: ResultsView;
  icon: LucideIcon;
  label: string;
};

export function ResultsViewToggleButton({
  target,
  icon: Icon,
  label,
}: ResultsViewToggleButtonProps) {
  const { view, setView } = useResultsViewParam();
  const active = view === target;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-pressed={active}
      data-active={active}
      className="h-6 text-xs data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90"
      onClick={() => setView(target)}
    >
      <Icon />
      {label}
    </Button>
  );
}
