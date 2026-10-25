'use client';

import {
  BotIcon,
  PhoneIcon,
  PlayIcon,
  UserIcon,
  UserRoundCogIcon,
} from 'lucide-react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { RunDetail } from '@/server/results/types';

import {
  agentChipText,
  agentHref,
  connectionText,
  testProfileHref,
} from '../../../../_utils/runs/run-detail-text';
import { runDetailStartText } from '../../../../_utils/runs/run-format';
import { RunChip } from './run-chip';

type RunDetailChipsProps = {
  run: RunDetail;
};

export function RunDetailChips({ run }: RunDetailChipsProps) {
  const projectId = useCurrentProjectId();

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <RunChip
        icon={BotIcon}
        text={agentChipText(run.agent)}
        copyLabel="Copy agent"
        linkLabel="Open agent"
        href={agentHref(run.agent)}
      />
      <RunChip
        icon={UserIcon}
        text={run.personality?.name ?? null}
        copyLabel="Copy personality"
      />
      <RunChip
        icon={UserRoundCogIcon}
        text={run.testProfile?.name ?? null}
        copyLabel="Copy testProfile"
        linkLabel="Open test profile"
        href={testProfileHref(run, projectId)}
      />
      <RunChip
        icon={PlayIcon}
        text={`Run started at ${runDetailStartText(run.startedAt)}`}
        copyLabel="Copy timestamp"
      />
      <RunChip
        icon={PhoneIcon}
        text={connectionText(run)}
        copyLabel="Copy connection"
      />
    </div>
  );
}
