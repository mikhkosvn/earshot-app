'use client';

import { usePatternGroup } from '../../_hooks/use-pattern-group';
import { SampleSourceButton } from './sample-source-button';
import { SampleVerdict } from './sample-verdict';

type RepresentativeSampleHeaderProps = {
  groupKey: string;
};

export function RepresentativeSampleHeader({
  groupKey,
}: RepresentativeSampleHeaderProps) {
  const { representative } = usePatternGroup(groupKey);

  if (!representative) return null;

  return (
    <div className="flex items-center gap-2">
      <SampleVerdict value={representative.verdict} />
      <SampleSourceButton label={representative.label} />
    </div>
  );
}
