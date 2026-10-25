'use client';

import { useActiveGenerationCount } from '../../_hooks/generation/use-active-generation-count';

export function GenerateEvaluatorsLabel() {
  const count = useActiveGenerationCount();

  if (count === 0) return 'Generate Evaluators';
  return `Generate Evaluators (${count})`;
}
