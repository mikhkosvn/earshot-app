import { format } from 'date-fns';

import { AlertWindowHours } from '@/server/alerts/constants/alert-window';
import type { AlertTimelineBucket } from '@/server/alerts/types';

import {
  ALERT_OTHER_COLOR,
  ALERT_SERIES_COLORS,
} from '../_constants/alert-chart';

const OTHER_KEY = 'other';
const HOUR_FORMAT = 'HH:mm';
const DAY_FORMAT = 'MMM d, HH:mm';

const labelFormatOf = (hours: AlertWindowHours) => {
  if (hours === AlertWindowHours.day) return HOUR_FORMAT;
  return DAY_FORMAT;
};

export interface ActivityRow extends Record<string, number | string> {
  label: string;
  total: number;
}

export const activityRows = (
  timeline: AlertTimelineBucket[],
  hours: AlertWindowHours,
): ActivityRow[] =>
  timeline.map((bucket) => ({
    ...bucket.counts,
    label: format(bucket.bucketStart, labelFormatOf(hours)),
    total: bucket.total,
  }));

export const seriesColor = (key: string, index: number) => {
  if (key === OTHER_KEY) return ALERT_OTHER_COLOR;
  return ALERT_SERIES_COLORS[index % ALERT_SERIES_COLORS.length];
};
