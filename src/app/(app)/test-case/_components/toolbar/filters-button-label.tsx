'use client';

import { useEvaluatorListParams } from '../../_hooks/use-evaluator-list-params';

export function FiltersButtonLabel() {
  const [params] = useEvaluatorListParams();
  const count =
    params.tags.length +
    params.personalities.length +
    params.agents.length +
    params.metrics.length;

  if (count === 0) return 'Filters';
  return `Filters (${count})`;
}
