export const TimeUnit = {
  second: 's',
  minute: 'm',
  hour: 'h',
  day: 'd',
  week: 'w',
  month: 'M',
  year: 'y',
} as const;

export type TimeUnit = (typeof TimeUnit)[keyof typeof TimeUnit];

export const NOW_EXPRESSION = 'now';

export interface QuickRange {
  label: string;
  from: string;
  to: string;
}

export const LAST_QUICK_RANGES: QuickRange[] = [
  { label: 'Last 5 minutes', from: 'now-5m', to: 'now' },
  { label: 'Last 15 minutes', from: 'now-15m', to: 'now' },
  { label: 'Last 30 minutes', from: 'now-30m', to: 'now' },
  { label: 'Last 1 hour', from: 'now-1h', to: 'now' },
  { label: 'Last 3 hours', from: 'now-3h', to: 'now' },
  { label: 'Last 6 hours', from: 'now-6h', to: 'now' },
  { label: 'Last 12 hours', from: 'now-12h', to: 'now' },
  { label: 'Last 24 hours', from: 'now-24h', to: 'now' },
  { label: 'Last 2 days', from: 'now-2d', to: 'now' },
  { label: 'Last 7 days', from: 'now-7d', to: 'now' },
  { label: 'Last 30 days', from: 'now-30d', to: 'now' },
];

export const TODAY_QUICK_RANGES: QuickRange[] = [
  { label: 'Today - 24 hours', from: 'now/d-24h', to: 'now' },
  { label: 'Today - 12 hours', from: 'now/d-12h', to: 'now' },
  { label: 'Today - 6 hours', from: 'now/d-6h', to: 'now' },
  { label: 'Today - 3 hours', from: 'now/d-3h', to: 'now' },
  { label: 'Today - 1 hour', from: 'now/d-1h', to: 'now' },
  { label: 'Today - 30 minutes', from: 'now/d-30m', to: 'now' },
  { label: 'Today - 15 minutes', from: 'now/d-15m', to: 'now' },
  { label: 'Today - 5 minutes', from: 'now/d-5m', to: 'now' },
  { label: 'Today - 2 days', from: 'now/d-2d', to: 'now' },
  { label: 'Today - 7 days', from: 'now/d-7d', to: 'now' },
  { label: 'Today - 30 days', from: 'now/d-30d', to: 'now' },
];

export const ALL_QUICK_RANGES: QuickRange[] = [
  ...LAST_QUICK_RANGES,
  ...TODAY_QUICK_RANGES,
];
