'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { PatternGroupCard } from './pattern-group-card';

export function PatternGroupList() {
  const review = usePatternReview();

  return (
    <div className="flex flex-col gap-4">
      {review.groups.map((group) => (
        <PatternGroupCard key={group.key} groupKey={group.key} />
      ))}
    </div>
  );
}
