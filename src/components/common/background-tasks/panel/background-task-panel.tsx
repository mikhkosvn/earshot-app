'use client';

import { useState } from 'react';

import type { JobKind } from '@/generated/prisma/enums';
import { JOB_KIND_TITLE } from '@/server/jobs/constants';

import type { PanelScope } from '../_utils/panel-jobs';
import { BackgroundTaskPanelBody } from './background-task-panel-body';
import { BackgroundTaskPanelHeader } from './background-task-panel-header';

interface BackgroundTaskPanelProps {
  kind: JobKind;
  scope: PanelScope;
  onClose: (kind: JobKind) => void;
  onDismiss: (kind: JobKind) => void;
}

export function BackgroundTaskPanel({
  kind,
  scope,
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
        scope={scope}
        minimized={minimized}
        onDismiss={() => onDismiss(kind)}
      />
    </section>
  );
}
