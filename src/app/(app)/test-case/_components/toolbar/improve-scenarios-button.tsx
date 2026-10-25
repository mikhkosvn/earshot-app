'use client';

import { WandSparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useActiveGenerationCount } from '../../_hooks/generation/use-active-generation-count';

type ImproveScenariosButtonProps = {
  onImproveOpen: () => void;
};

export function ImproveScenariosButton({
  onImproveOpen,
}: ImproveScenariosButtonProps) {
  const activeCount = useActiveGenerationCount();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={activeCount > 0}
      onClick={onImproveOpen}
    >
      <WandSparklesIcon />
      Improve Scenarios
    </Button>
  );
}
