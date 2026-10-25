'use client';

import { GroupScoreInput } from './group-score-input';
import { NaScoreToggle } from './na-score-toggle';

type GroupScoreControlsProps = {
  groupKey: string;
};

export function GroupScoreControls({ groupKey }: GroupScoreControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Set score for this group:
      </span>
      <GroupScoreInput groupKey={groupKey} />
      <NaScoreToggle groupKey={groupKey} />
    </div>
  );
}
