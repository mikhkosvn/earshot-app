'use client';

import { Badge } from '@/components/ui/badge';

import { useActiveRuleCount } from '../../_hooks/use-active-rule-count';

export function RubricActiveCountChip() {
  const count = useActiveRuleCount();

  return (
    <Badge variant="secondary" className="font-normal">
      {count} active
    </Badge>
  );
}
