import type { z } from 'zod';

import {
  checkMetricDefinition,
  createMetricObject,
} from '@/server/metrics/schemas';

export const createMetricFormSchema = createMetricObject
  .omit({ projectId: true })
  .superRefine(checkMetricDefinition);

export type CreateMetricFormInput = z.input<typeof createMetricFormSchema>;
export type CreateMetricFormValues = z.output<typeof createMetricFormSchema>;
