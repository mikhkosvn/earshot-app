'use client';

import type { JobKind } from '@/generated/prisma/enums';

import type { PanelScope } from '../_utils/panel-jobs';
import { BackgroundTaskList } from './background-task-list';
import { BackgroundTaskSummary } from './background-task-summary';

interface BackgroundTaskPanelBodyProps {
  kind: JobKind;
  scope: PanelScope;
  minimized: boolean;
  onDismiss: () => void;
}

export function BackgroundTaskPanelBody({
  kind,
  scope,
  minimized,
  onDismiss,
}: BackgroundTaskPanelBodyProps) {
  if (minimized) return null;

  return (
    <div>
      <BackgroundTaskSummary kind={kind} scope={scope} onDismiss={onDismiss} />
      <BackgroundTaskList kind={kind} scope={scope} onDismiss={onDismiss} />
    </div>
  );
}
