import 'server-only';

import { addEventFields } from '@/server/common/logging/event-fields';
import { wideEventStore } from '@/server/common/logging/wide-event-store';

interface EmailTotals {
  sent_count?: number;
  failed_count?: number;
  skipped_count?: number;
}

const readEmailTotal = (key: keyof EmailTotals) => {
  const email = wideEventStore.getStore()?.email;
  if (typeof email !== 'object' || email === null) return 0;
  if (Array.isArray(email) || email instanceof Date) return 0;
  const value = email[key];
  if (typeof value === 'number') return value;
  return 0;
};

export const recordEmailTotals = ({
  sent_count = 0,
  failed_count = 0,
  skipped_count = 0,
}: EmailTotals) => {
  addEventFields({
    email: {
      sent_count: readEmailTotal('sent_count') + sent_count,
      failed_count: readEmailTotal('failed_count') + failed_count,
      skipped_count: readEmailTotal('skipped_count') + skipped_count,
    },
  });
};
