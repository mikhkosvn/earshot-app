import type { z } from 'zod';

import { labCorrectionSchema } from '@/server/lab-test-sets/schemas';

export const correctMetricFormSchema = labCorrectionSchema.pick({
  expectedValue: true,
  feedback: true,
});

export type CorrectMetricFormInput = z.input<typeof correctMetricFormSchema>;
