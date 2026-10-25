import type { z } from 'zod';

import { testProfileFieldsSchema } from '@/server/test-profiles/schemas';

import { requiredId } from './required-id';

export const testProfileFormSchema = testProfileFieldsSchema.extend({
  agentId: requiredId('Select an agent.'),
});

export type TestProfileFormValues = z.input<typeof testProfileFormSchema>;
export type TestProfileFormOutput = z.output<typeof testProfileFormSchema>;
