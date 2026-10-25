import { z } from 'zod';

import { LAST_QUICK_RANGES } from '@/lib/time-range/constants';
import { createConfigurationSchema } from '@/server/runs-overview/schemas';

const RANGE_LABELS = LAST_QUICK_RANGES.map((range) => range.label);

export const saveConfigurationFormSchema = createConfigurationSchema
  .pick({ name: true, includeMetricVisibility: true })
  .extend({
    range: z
      .string()
      .refine((label) => RANGE_LABELS.includes(label), 'Select a date range.'),
  });

export type SaveConfigurationFormValues = z.input<
  typeof saveConfigurationFormSchema
>;
