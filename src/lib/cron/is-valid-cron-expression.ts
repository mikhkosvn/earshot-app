import { CronExpressionParser } from 'cron-parser';

import { CRON_FIELD_COUNT, splitCronExpression } from './cron-fields';

export const isValidCronExpression = (expression: string) => {
  if (splitCronExpression(expression).length !== CRON_FIELD_COUNT) return false;
  try {
    CronExpressionParser.parse(expression.trim());
    return true;
  } catch {
    return false;
  }
};
