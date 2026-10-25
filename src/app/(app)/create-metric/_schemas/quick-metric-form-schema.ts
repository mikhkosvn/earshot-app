import type { z } from 'zod';

import { startQuickMetricBuildSchema } from '@/server/metrics/schemas';

export const quickMetricFormSchema = startQuickMetricBuildSchema.omit({
  projectId: true,
});

export type QuickMetricFormInput = z.input<typeof quickMetricFormSchema>;
export type QuickMetricFormValues = z.output<typeof quickMetricFormSchema>;
