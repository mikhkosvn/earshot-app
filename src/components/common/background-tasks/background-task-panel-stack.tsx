'use client';

import { useState } from 'react';

import type { JobKind } from '@/generated/prisma/enums';
import { useRecentJobs } from '@/hooks/jobs/use-recent-jobs';

import {
  type HiddenBefore,
  latestJobTime,
  visiblePanelKinds,
  withKind,
} from './_utils/panel-jobs';
import { BackgroundTaskPanel } from './panel/background-task-panel';

export function BackgroundTaskPanelStack() {
  const jobs = useRecentJobs();
  const [hiddenBefore, setHiddenBefore] = useState<HiddenBefore>({});
  const [pinnedKinds, setPinnedKinds] = useState<JobKind[]>([]);
  const kinds = visiblePanelKinds(jobs, hiddenBefore, pinnedKinds);

  if (kinds.length === 0) return null;

  const closePanel = (kind: JobKind) => {
    setHiddenBefore((current) => ({
      ...current,
      [kind]: latestJobTime(jobs, kind),
    }));
    setPinnedKinds((current) => current.filter((item) => item !== kind));
  };

  const pinPanel = (kind: JobKind) => {
    setPinnedKinds((current) => withKind(current, kind));
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex w-80 flex-col gap-3">
      {kinds.map((kind) => (
        <BackgroundTaskPanel
          key={kind}
          kind={kind}
          hiddenBefore={hiddenBefore[kind]}
          onClose={closePanel}
          onDismiss={pinPanel}
        />
      ))}
    </div>
  );
}
