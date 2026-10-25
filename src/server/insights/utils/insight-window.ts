import 'server-only';

import { parseTimeExpression } from '@/lib/time-range/parse-time-expression';
import { ActionError } from '@/server/common/run-action';

export const insightWindowOf = (from: string, to: string) => {
  const now = new Date();
  const windowStart = parseTimeExpression(from, now);
  const windowEnd = parseTimeExpression(to, now);
  if (!windowStart || !windowEnd || windowStart >= windowEnd) {
    throw new ActionError(
      'The start of the time range must be before its end.',
      422,
    );
  }
  return { windowStart, windowEnd };
};
