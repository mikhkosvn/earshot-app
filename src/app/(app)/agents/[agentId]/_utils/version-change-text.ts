import { HistoryChangeType } from '@/generated/prisma/enums';
import { HistoryChangeTypeLabel } from '@/server/agents/constants/history-change-type-labels';
import type { AgentVersionItem } from '@/server/agents/types';

export const versionChangeText = (version: AgentVersionItem) => {
  if (version.changeType === HistoryChangeType.created) {
    return HistoryChangeTypeLabel[version.changeType];
  }
  return version.changeReason ?? HistoryChangeTypeLabel[version.changeType];
};
