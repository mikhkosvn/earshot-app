'use client';

import { useRuleCount } from '../../_hooks/use-rule-count';

export function RubricConditionsEmpty() {
  const count = useRuleCount();

  if (count > 0) return null;

  return (
    <p className="py-6 text-center text-sm text-muted-foreground">
      No conditions yet. Add a condition.
    </p>
  );
}
