'use client';

import { Badge } from '@/components/ui/badge';

import { usePatternGroup } from '../../_hooks/use-pattern-group';
import { groupSizeText } from '../../_utils/review-text';
import { OtherCallsCollapsible } from './others/other-calls-collapsible';
import { RepresentativeCallBox } from './representative-call-box';
import { CorrectionNoteField } from './score/correction-note-field';
import { GroupScoreControls } from './score/group-score-controls';

interface PatternGroupCardProps {
  groupKey: string;
}

export function PatternGroupCard({ groupKey }: PatternGroupCardProps) {
  const group = usePatternGroup(groupKey);

  return (
    <section
      data-corrected={group.correction !== null}
      className="flex flex-col gap-3 rounded-lg border bg-background p-4 data-[corrected=true]:border-amber-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-base font-medium text-foreground">
            {group.label}
          </h2>
          <p className="text-sm text-muted-foreground">{group.summary}</p>
        </div>
        <Badge variant="outline" className="shrink-0 font-normal">
          {groupSizeText(group.size)}
        </Badge>
      </div>
      <RepresentativeCallBox groupKey={groupKey} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <GroupScoreControls groupKey={groupKey} />
        <OtherCallsCollapsible groupKey={groupKey} />
      </div>
      <CorrectionNoteField groupKey={groupKey} />
    </section>
  );
}
