'use client';

import { useWatch } from 'react-hook-form';

import { listCronDates } from '@/lib/cron/list-cron-dates';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

import { formatCronDate } from '../_utils/schedule/format-cron-date';
import { useMonitorFormContext } from './use-monitor-form-context';

export const useCronDates = (count: number) => {
  const { control } = useMonitorFormContext();
  const [cronExpression, timezone] = useWatch({
    control,
    name: ['cronExpression', 'timezone'],
  });
  const timeZone = TimezoneLabel[timezone];
  return listCronDates({
    expression: cronExpression,
    timeZone,
    from: new Date(),
    count,
  }).map((date) => formatCronDate(date, timeZone));
};
