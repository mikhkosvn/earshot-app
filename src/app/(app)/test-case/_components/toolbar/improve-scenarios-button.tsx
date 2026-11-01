'use client';

import { WandSparklesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useActiveGenerationCount } from '../../_hooks/generation/use-active-generation-count';
import { useImprovePanelParams } from '../../_hooks/improve/use-improve-panel-params';

export function ImproveScenariosButton() {
  const activeCount = useActiveGenerationCount();
  const [, setParams] = useImprovePanelParams();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={activeCount > 0}
      onClick={() => setParams({ improve: true })}
    >
      <WandSparklesIcon />
      Improve Scenarios
    </Button>
  );
}
