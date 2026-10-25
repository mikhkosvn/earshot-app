'use client';

import { usePatternGroup } from '../../_hooks/use-pattern-group';
import { EvidenceLine } from './evidence-line';
import { RepresentativeSampleHeader } from './representative-sample-header';
import { WhyThisScore } from './why-this-score';

type RepresentativeCallBoxProps = {
  groupKey: string;
};

export function RepresentativeCallBox({
  groupKey,
}: RepresentativeCallBoxProps) {
  const group = usePatternGroup(groupKey);

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          Representative call
        </span>
        <RepresentativeSampleHeader groupKey={groupKey} />
      </div>
      <div className="flex flex-col gap-2 px-2">
        {group.evidence.map((line, index) => (
          <EvidenceLine key={index} line={line} />
        ))}
      </div>
      <WhyThisScore groupKey={groupKey} />
    </div>
  );
}
