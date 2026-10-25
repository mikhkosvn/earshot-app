import type { PatternEvidenceView } from '@/server/metrics/types';

import { SpeakerLabel } from '../../_constants/speaker-label';

interface EvidenceLineProps {
  line: PatternEvidenceView;
}

export function EvidenceLine({ line }: EvidenceLineProps) {
  return (
    <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2 text-sm">
      <span className="text-muted-foreground">
        {SpeakerLabel[line.speaker]}
      </span>
      <p
        data-key={line.isKey}
        className="text-foreground data-[key=true]:font-semibold"
      >
        <span className="mr-2 rounded-sm border bg-background px-1 py-0.5 font-mono text-[11px] font-normal text-muted-foreground">
          {line.time}
        </span>
        {line.text}
      </p>
    </div>
  );
}
