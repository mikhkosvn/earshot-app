export const CRON_FIELD_COUNT = 5;

export const splitCronExpression = (expression: string) =>
  expression.trim().split(/\s+/).filter(Boolean);
