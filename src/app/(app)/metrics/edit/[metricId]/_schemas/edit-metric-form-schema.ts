import type { z } from 'zod';

import {
  checkMetricDefinition,
  updateMetricObject,
} from '@/server/metrics/schemas';

export const editMetricFormSchema = updateMetricObject
  .omit({ metricId: true })
  .superRefine(checkMetricDefinition);

export type EditMetricFormInput = z.input<typeof editMetricFormSchema>;
export type EditMetricFormValues = z.output<typeof editMetricFormSchema>;
