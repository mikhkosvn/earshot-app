export const AlertWindowHours = {
  day: 24,
  threeDays: 72,
  week: 168,
} as const;

export type AlertWindowHours =
  (typeof AlertWindowHours)[keyof typeof AlertWindowHours];

export const ALERT_WINDOW_OPTIONS = [
  { hours: AlertWindowHours.day, label: '24h' },
  { hours: AlertWindowHours.threeDays, label: '3d' },
  { hours: AlertWindowHours.week, label: '7d' },
] as const;

export const DEFAULT_ALERT_WINDOW_HOURS = AlertWindowHours.day;

export const ALERT_BUCKET_HOURS: Record<AlertWindowHours, number> = {
  [AlertWindowHours.day]: 1,
  [AlertWindowHours.threeDays]: 3,
  [AlertWindowHours.week]: 6,
};

export const isAlertWindowHours = (value: number): value is AlertWindowHours =>
  Object.values<number>(AlertWindowHours).includes(value);

export const toAlertWindowHours = (value: number | null): AlertWindowHours => {
  if (value !== null && isAlertWindowHours(value)) return value;
  return DEFAULT_ALERT_WINDOW_HOURS;
};

export const alertWindowLabel = (hours: AlertWindowHours) =>
  ALERT_WINDOW_OPTIONS.find((option) => option.hours === hours)?.label ??
  ALERT_WINDOW_OPTIONS[0].label;
