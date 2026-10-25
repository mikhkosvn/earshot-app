import { z } from 'zod';

export const requiredId = (message: string) =>
  z
    .number()
    .int()
    .positive(message)
    .nullable()
    .transform((value, context) => {
      if (value !== null) return value;
      context.addIssue({ code: 'custom', message });
      return z.NEVER;
    });
