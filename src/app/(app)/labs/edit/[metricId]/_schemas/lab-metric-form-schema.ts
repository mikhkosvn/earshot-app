import type { z } from 'zod';

import {
  checkMetricDefinition,
  updateMetricObject,
} from '@/server/metrics/schemas';

export const labMetricFormSchema = updateMetricObject
  .omit({ metricId: true })
  .superRefine(checkMetricDefinition);

export type LabMetricFormInput = z.input<typeof labMetricFormSchema>;
export type LabMetricFormValues = z.output<typeof labMetricFormSchema>;
