import { HistoryChangeType } from '@/generated/prisma/enums';

export const HistoryChangeTypeLabel: Record<HistoryChangeType, string> = {
  [HistoryChangeType.created]: 'Initial version',
  [HistoryChangeType.updated]: 'Updated',
};
