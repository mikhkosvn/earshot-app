'use client';

import { Spinner } from '@/components/ui/spinner';

import { useIsResultOpen } from '../../_hooks/use-is-result-open';
import { useResultDetail } from '../../_hooks/use-result-detail';
import { formatPercent } from '../../_utils/number-format';
import { coverageOf } from '../../_utils/workflow-coverage';
import { PercentBar } from '../percent-bar';

export function WorkflowCoverageSummary() {
  const { workflow } = useResultDetail();
  const isOpen = useIsResultOpen();

  if (!workflow.generated && isOpen) {
    return (
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        Computing…
      </span>
    );
  }
  if (workflow.paths.length === 0) {
    return (
      <span className="text-sm text-muted-foreground">No workflow paths</span>
    );
  }
  const coverage = coverageOf(workflow.paths);
  return (
    <span className="flex items-center gap-4 text-sm">
      <span className="text-muted-foreground">
        {coverage.covered} of {coverage.total} Covered
      </span>
      <span className="font-medium">{formatPercent(coverage.percent)}</span>
      <PercentBar percent={coverage.percent} className="w-28" />
    </span>
  );
}
