import { format } from 'date-fns';

import type { KnowledgeConnectorItem } from '@/server/agents/types';

export const connectorSyncText = (connector: KnowledgeConnectorItem) => {
  if (!connector.syncEnabled) return 'Sync off';
  if (!connector.lastSyncedAt) {
    return `Not synced yet · every ${connector.syncIntervalDays} day(s)`;
  }
  return `Last synced ${format(new Date(connector.lastSyncedAt), 'MMM d, yyyy')}`;
};
