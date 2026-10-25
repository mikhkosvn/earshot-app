import { CheckIcon, XIcon } from 'lucide-react';

import type { RubricVerdict } from '@/server/metric-scoring/types';

interface RubricVerdictBadgeProps {
  rubric: RubricVerdict;
}

export function RubricVerdictBadge({ rubric }: RubricVerdictBadgeProps) {
  if (rubric.passed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        <CheckIcon className="size-3" />
        Passed - {rubric.passedCount}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-xs text-red-700 dark:bg-red-950 dark:text-red-300">
      <XIcon className="size-3" />
      Failed - {rubric.failedCount}
    </span>
  );
}
