'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useInsightRange } from '../../_hooks/params/use-insight-range';
import { useIsRunningInsight } from '../../_hooks/mutations/use-is-running-insight';
import { useRunInsightMutation } from '../../_hooks/mutations/use-run-insight-mutation';
import { RunInsightIcon } from './run-insight-icon';
import { RunInsightLabel } from './run-insight-label';

interface RunInsightButtonProps {
  metricId: number;
}

export function RunInsightButton({ metricId }: RunInsightButtonProps) {
  const projectId = useCurrentProjectId();
  const { from, to } = useInsightRange();
  const runInsight = useRunInsightMutation();
  const isRunning = useIsRunningInsight(metricId);

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className="text-[11px]"
      disabled={isRunning}
      onClick={() => runInsight.mutate({ projectId, metricId, from, to })}
    >
      <RunInsightIcon isRunning={isRunning} />
      <RunInsightLabel isRunning={isRunning} />
    </Button>
  );
}
