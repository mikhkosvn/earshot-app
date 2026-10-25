import type { z } from 'zod';

export const firstIssueMessage = (error: z.ZodError) => {
  const [issue] = error.issues;
  if (!issue) return 'The value is not valid.';
  if (issue.path.length === 0) return issue.message;
  return `${issue.path.join('.')}: ${issue.message}`;
};
