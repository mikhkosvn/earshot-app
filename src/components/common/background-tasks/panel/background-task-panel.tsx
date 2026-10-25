'use client';

import { useState } from 'react';

import type { JobKind } from '@/generated/prisma/enums';
import { JOB_KIND_TITLE } from '@/server/jobs/constants';

import { BackgroundTaskPanelBody } from './background-task-panel-body';
import { BackgroundTaskPanelHeader } from './background-task-panel-header';

type BackgroundTaskPanelProps = {
  kind: JobKind;
  hiddenBefore: number | undefined;
  onClose: (kind: JobKind) => void;
  onDismiss: (kind: JobKind) => void;
};

export function BackgroundTaskPanel({
  kind,
  hiddenBefore,
  onClose,
  onDismiss,
}: BackgroundTaskPanelProps) {
  const [minimized, setMinimized] = useState(false);

  return (
    <section
      aria-label={JOB_KIND_TITLE[kind]}
      className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg"
    >
      <BackgroundTaskPanelHeader
        title={JOB_KIND_TITLE[kind]}
        minimized={minimized}
        onToggleMinimize={() => setMinimized((current) => !current)}
        onClose={() => onClose(kind)}
      />
      <BackgroundTaskPanelBody
        kind={kind}
        hiddenBefore={hiddenBefore}
        minimized={minimized}
        onDismiss={() => onDismiss(kind)}
      />
    </section>
  );
}
