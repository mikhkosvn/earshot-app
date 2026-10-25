'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';

import { useRunDeepResearchMutation } from '../../_hooks/mutations/use-run-deep-research-mutation';
import { RunInsightIcon } from '../cards/run-insight-icon';
import { RunDeepResearchLabel } from './run-deep-research-label';

export function RunDeepResearchButton() {
  const projectId = useCurrentProjectId();
  const runDeepResearch = useRunDeepResearchMutation();

  return (
    <Button
      type="button"
      size="sm"
      className="shrink-0 text-xs"
      disabled={runDeepResearch.isPending}
      onClick={() => runDeepResearch.mutate({ projectId })}
    >
      <RunInsightIcon isRunning={runDeepResearch.isPending} />
      <RunDeepResearchLabel isRunning={runDeepResearch.isPending} />
    </Button>
  );
}
