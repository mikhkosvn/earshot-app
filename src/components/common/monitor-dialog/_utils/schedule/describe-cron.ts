import { CRON_FIELD_COUNT, splitCronExpression } from '@/lib/cron/cron-fields';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const STEP_PATTERN = /^\*\/(\d+)$/;
const NUMBER_PATTERN = /^\d+$/;
const RANGE_PATTERN = /^(\d+)-(\d+)$/;

const stepOf = (value: string) => value.match(STEP_PATTERN)?.[1] ?? null;

const describeMinute = (value: string) => {
  if (value === '*') return 'every minute';
  if (value === '0') return 'at the start of the hour';
  const step = stepOf(value);
  if (step) return `every ${step} minutes`;
  if (NUMBER_PATTERN.test(value)) return `at minute ${value}`;
  return `at minutes ${value}`;
};

const describeHour = (value: string) => {
  if (value === '*') return 'every hour';
  const step = stepOf(value);
  if (step) return `every ${step} hours`;
  if (NUMBER_PATTERN.test(value)) return `at hour ${value}`;
  return `at hours ${value}`;
};

const describeDayOfMonth = (value: string) => {
  if (value === '*') return 'every day';
  if (value === 'L') return 'on the last day of the month';
  const step = stepOf(value);
  if (step) return `every ${step} days`;
  if (NUMBER_PATTERN.test(value)) return `on day ${value} of the month`;
  return `on days ${value} of the month`;
};

const describeMonth = (value: string) => {
  if (value === '*') return 'every month';
  const step = stepOf(value);
  if (step) return `every ${step} months`;
  const name = MONTH_NAMES[Number(value) - 1];
  if (NUMBER_PATTERN.test(value) && name) return `in ${name}`;
  return `in months ${value}`;
};

const dayName = (value: string) => DAY_NAMES[Number(value)] ?? value;

const describeDayOfWeek = (value: string) => {
  if (value === '*') return 'every day of the week';
  const step = stepOf(value);
  if (step) return `every ${step} days of the week`;
  if (NUMBER_PATTERN.test(value)) return `on ${dayName(value)}`;
  const range = value.match(RANGE_PATTERN);
  if (range) return `from ${dayName(range[1])} to ${dayName(range[2])}`;
  if (value.split(',').every((item) => NUMBER_PATTERN.test(item))) {
    return `on ${value.split(',').map(dayName).join(', ')}`;
  }
  return `on days of the week ${value}`;
};

export const describeCron = (expression: string) => {
  const fields = splitCronExpression(expression);
  if (fields.length !== CRON_FIELD_COUNT) return null;
  const [minute, hour, dayOfMonth, month, dayOfWeek] = fields;
  return [
    describeMinute(minute),
    describeHour(hour),
    describeDayOfMonth(dayOfMonth),
    describeMonth(month),
    describeDayOfWeek(dayOfWeek),
  ].join(', ');
};
