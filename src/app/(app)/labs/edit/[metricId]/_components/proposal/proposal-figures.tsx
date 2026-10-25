import type { LabScore } from '@/server/labs/types';

import { optionalScoreText } from '../../_utils/value-text';

interface ProposalFiguresProps {
  oldScore: LabScore | null;
  newScore: LabScore | null;
}

export function ProposalFigures({ oldScore, newScore }: ProposalFiguresProps) {
  return (
    <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
      <div className="flex flex-col gap-0.5">
        <dt className="text-xs text-muted-foreground">Lab accuracy before</dt>
        <dd className="font-mono">{optionalScoreText(oldScore)}</dd>
      </div>
      <div className="flex flex-col gap-0.5">
        <dt className="text-xs text-muted-foreground">After</dt>
        <dd className="font-mono">{optionalScoreText(newScore)}</dd>
      </div>
    </dl>
  );
}
