import 'server-only';

import { ZodError } from 'zod';

export interface FieldIssue {
  field: string;
  message: string;
}

export const fieldErrors = (issues: FieldIssue[]) =>
  new ZodError(
    issues.map(({ field, message }) => ({
      code: 'custom' as const,
      path: [field],
      message,
      input: undefined,
    })),
  );

export const throwFieldErrors = (issues: FieldIssue[]) => {
  if (!issues.length) return;
  throw fieldErrors(issues);
};
