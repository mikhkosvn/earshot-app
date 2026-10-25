import { z } from 'zod';

import { CALL_EXPORT_ROW_MAX } from '@/server/call-exports/constants';
import { callLogListScopeSchema } from '@/server/call-logs/schemas';

export const exportRowCountSchema = z
  .number({ error: 'Enter a number from 1 to 10,000.' })
  .int('Enter a whole number.')
  .min(1, 'Enter a number from 1 to 10,000.')
  .max(CALL_EXPORT_ROW_MAX, 'Enter a number from 1 to 10,000.');

export const exportCallLogsSchema = callLogListScopeSchema.extend({
  numRecords: exportRowCountSchema,
});
