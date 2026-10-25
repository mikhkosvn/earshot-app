import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
  isValid,
  parse,
  parseISO,
  startOfDay,
} from 'date-fns';

import { NOW_EXPRESSION, TimeUnit } from './constants';

const RELATIVE_PATTERN = /^now(\/d)?(?:([+-])(\d+)([smhdwMy]))?$/;

const ABSOLUTE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

const ADDERS: Record<TimeUnit, (date: Date, amount: number) => Date> = {
  [TimeUnit.second]: addSeconds,
  [TimeUnit.minute]: addMinutes,
  [TimeUnit.hour]: addHours,
  [TimeUnit.day]: addDays,
  [TimeUnit.week]: addWeeks,
  [TimeUnit.month]: addMonths,
  [TimeUnit.year]: addYears,
};

const isTimeUnit = (value: string): value is TimeUnit =>
  Object.values<string>(TimeUnit).includes(value);

const signOf = (sign: string) => {
  if (sign === '-') return -1;
  return 1;
};

const baseOf = (startOfToday: string | undefined, now: Date) => {
  if (startOfToday) return startOfDay(now);
  return now;
};

const parseRelative = (expression: string, now: Date) => {
  const match = RELATIVE_PATTERN.exec(expression);
  if (!match) return null;
  const [, startOfToday, sign, amount, unit] = match;
  const base = baseOf(startOfToday, now);
  if (!sign || !amount || !unit || !isTimeUnit(unit)) return base;
  const signed = Number(amount) * signOf(sign);
  return ADDERS[unit](base, signed);
};

const parseAbsolute = (expression: string, now: Date) => {
  const local = parse(expression, ABSOLUTE_FORMAT, now);
  if (isValid(local)) return local;
  const iso = parseISO(expression);
  if (isValid(iso)) return iso;
  return null;
};

export const parseTimeExpression = (
  expression: string,
  now: Date = new Date(),
): Date | null => {
  const trimmed = expression.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith(NOW_EXPRESSION)) return parseRelative(trimmed, now);
  return parseAbsolute(trimmed, now);
};

export const isTimeExpression = (expression: string) =>
  parseTimeExpression(expression) !== null;
