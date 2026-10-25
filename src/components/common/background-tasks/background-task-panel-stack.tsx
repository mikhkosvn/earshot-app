'use client';

import { useState } from 'react';

import type { JobKind } from '@/generated/prisma/enums';
import { useRecentJobs } from '@/hooks/jobs/use-recent-jobs';

import {
  type ClosedPanels,
  latestJobTime,
  panelScope,
  stackPanels,
  withKind,
} from './_utils/panel-jobs';
import { BackgroundTaskStackItem } from './background-task-stack-item';

export function BackgroundTaskPanelStack() {
  const jobs = useRecentJobs();
  const [sessionStart] = useState(() => Date.now());
  const [closedPanels, setClosedPanels] = useState<ClosedPanels>({});
  const [pinnedKinds, setPinnedKinds] = useState<JobKind[]>([]);
  const panels = stackPanels(jobs, sessionStart, closedPanels, pinnedKinds);

  if (panels.length === 0) return null;

  const closePanel = (key: string) => {
    setClosedPanels((current) => ({
      ...current,
      [key]: Math.max(sessionStart, latestJobTime(jobs, key)),
    }));
    setPinnedKinds((current) => current.filter((item) => item !== key));
  };

  const pinPanel = (kind: JobKind) => {
    setPinnedKinds((current) => withKind(current, kind));
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex w-80 flex-col gap-3">
      {panels.map((panel) => (
        <BackgroundTaskStackItem
          key={panel.key}
          panel={panel}
          scope={panelScope(panel.key, sessionStart, closedPanels)}
          onClose={closePanel}
          onDismiss={pinPanel}
        />
      ))}
    </div>
  );
}
