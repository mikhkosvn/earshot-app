import { CronExpressionParser } from 'cron-parser';

import { isValidCronExpression } from './is-valid-cron-expression';

type ListCronDatesArgs = {
  expression: string;
  timeZone: string;
  from: Date;
  count: number;
};

export const listCronDates = ({
  expression,
  timeZone,
  from,
  count,
}: ListCronDatesArgs): Date[] => {
  if (!isValidCronExpression(expression)) return [];
  const iterator = CronExpressionParser.parse(expression.trim(), {
    currentDate: from,
    tz: timeZone,
  });
  return iterator.take(count).map((date) => date.toDate());
};

export const nextCronDate = (args: Omit<ListCronDatesArgs, 'count'>) => {
  const [next] = listCronDates({ ...args, count: 1 });
  return next ?? null;
};
