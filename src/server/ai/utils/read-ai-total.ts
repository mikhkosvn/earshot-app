import 'server-only';

import { wideEventStore } from '@/server/common/logging/wide-event-store';

export const readAiTotal = (key: string) => {
  const ai = wideEventStore.getStore()?.ai;
  if (typeof ai !== 'object' || ai === null) return 0;
  if (Array.isArray(ai) || ai instanceof Date) return 0;
  const value = ai[key];
  if (typeof value === 'number') return value;
  return 0;
};
