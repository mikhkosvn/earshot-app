import { CRON_FIELD_COUNT, splitCronExpression } from '@/lib/cron/cron-fields';

const ANY_VALUE = '*';

export const toCronParts = (expression: string) => {
  const fields = splitCronExpression(expression).slice(0, CRON_FIELD_COUNT);
  return Array.from(
    { length: CRON_FIELD_COUNT },
    (_, index) => fields[index] ?? ANY_VALUE,
  );
};

export const joinCronParts = (parts: string[]) =>
  parts.map((part) => part.trim() || ANY_VALUE).join(' ');

export const replaceCronPart = (
  parts: string[],
  index: number,
  value: string,
) =>
  parts.map((part, partIndex) => {
    if (partIndex === index) return value;
    return part;
  });
