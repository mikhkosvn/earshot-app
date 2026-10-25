'use client';

import { usePatternGroup } from '../../_hooks/use-pattern-group';
import { explanationBullets } from '../../_utils/explanation-bullets';

type WhyThisScoreProps = {
  groupKey: string;
};

export function WhyThisScore({ groupKey }: WhyThisScoreProps) {
  const { representative } = usePatternGroup(groupKey);
  const bullets = explanationBullets(representative?.explanation ?? []);

  if (bullets.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-muted-foreground">Why this score</span>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-foreground">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
