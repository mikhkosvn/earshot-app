'use client';

import { useWatch } from 'react-hook-form';

import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

import { countWeeklyRuns } from '../_utils/schedule/count-weekly-runs';
import { useMonitorFormContext } from './use-monitor-form-context';

export const useRunsPerWeek = () => {
  const { control } = useMonitorFormContext();
  const [cronExpression, timezone] = useWatch({
    control,
    name: ['cronExpression', 'timezone'],
  });
  return countWeeklyRuns(cronExpression, TimezoneLabel[timezone], new Date());
};
