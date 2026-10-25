import { z } from 'zod';

import { exportRowCountSchema } from '@/server/call-exports/schemas';

export const exportCallsFormSchema = z.object({
  numRecords: exportRowCountSchema,
});

export type ExportCallsFormValues = z.input<typeof exportCallsFormSchema>;
