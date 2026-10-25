'use client';

import { JobKind } from '@/generated/prisma/enums';

import type { PanelScope, StackPanel } from './_utils/panel-jobs';
import { BackgroundTaskPanel } from './panel/background-task-panel';
import { ReviewTaskPanel } from './review-panel/review-task-panel';

type BackgroundTaskStackItemProps = {
  panel: StackPanel;
  scope: PanelScope;
  onClose: (key: string) => void;
  onDismiss: (kind: JobKind) => void;
};

export function BackgroundTaskStackItem({
  panel,
  scope,
  onClose,
  onDismiss,
}: BackgroundTaskStackItemProps) {
  if (panel.kind === JobKind.metric_pattern_review && panel.latestJob) {
    return (
      <ReviewTaskPanel
        job={panel.latestJob}
        onClose={() => onClose(panel.key)}
      />
    );
  }

  return (
    <BackgroundTaskPanel
      kind={panel.kind}
      scope={scope}
      onClose={onClose}
      onDismiss={onDismiss}
    />
  );
}
