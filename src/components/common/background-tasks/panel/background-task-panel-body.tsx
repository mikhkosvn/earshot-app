'use client';

import type { JobKind } from '@/generated/prisma/enums';

import { BackgroundTaskList } from './background-task-list';
import { BackgroundTaskSummary } from './background-task-summary';

type BackgroundTaskPanelBodyProps = {
  kind: JobKind;
  hiddenBefore: number | undefined;
  minimized: boolean;
  onDismiss: () => void;
};

export function BackgroundTaskPanelBody({
  kind,
  hiddenBefore,
  minimized,
  onDismiss,
}: BackgroundTaskPanelBodyProps) {
  if (minimized) return null;

  return (
    <div>
      <BackgroundTaskSummary
        kind={kind}
        hiddenBefore={hiddenBefore}
        onDismiss={onDismiss}
      />
      <BackgroundTaskList
        kind={kind}
        hiddenBefore={hiddenBefore}
        onDismiss={onDismiss}
      />
    </div>
  );
}
