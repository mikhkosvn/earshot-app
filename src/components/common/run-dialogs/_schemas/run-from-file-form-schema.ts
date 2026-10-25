import type { z } from 'zod';

import { testSuiteRequestSchema } from '@/server/runs/schemas';

export const runFromFileFormSchema = testSuiteRequestSchema.omit({
  projectId: true,
});

export type RunFromFileValues = z.input<typeof runFromFileFormSchema>;
export type RunFromFileOutput = z.output<typeof runFromFileFormSchema>;
