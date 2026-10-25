import { z } from 'zod';

import {
  mockToolMappingsSchema,
  mockToolNameSchema,
} from '@/server/agents/schemas';

import { firstIssueMessage } from '../_utils/first-issue-message';

const parseJson = (value: string) => {
  try {
    const parsed: unknown = JSON.parse(value);
    return { ok: true as const, value: parsed };
  } catch {
    return { ok: false as const };
  }
};

export const mockToolFormSchema = z.object({
  name: mockToolNameSchema,
  description: z.string().trim().max(2000),
  mappingsJson: z.string().superRefine((value, context) => {
    const parsed = parseJson(value);
    if (!parsed.ok) {
      context.addIssue({ code: 'custom', message: 'Enter valid JSON.' });
      return;
    }
    const result = mockToolMappingsSchema.safeParse(parsed.value);
    if (result.success) return;
    context.addIssue({
      code: 'custom',
      message: firstIssueMessage(result.error),
    });
  }),
});

export type MockToolFormValues = z.input<typeof mockToolFormSchema>;

export const toMappings = (mappingsJson: string) =>
  mockToolMappingsSchema.parse(JSON.parse(mappingsJson));
