'use client';

import { useQueryState } from 'nuqs';

import {
  type AlertWindowHours,
  toAlertWindowHours,
} from '@/server/alerts/constants/alert-window';

import { alertsPageParsers } from '../../_constants/alerts-params';

export const useAlertWindow = () => {
  const [hours, setHours] = useQueryState('hours', alertsPageParsers.hours);

  return {
    hours: toAlertWindowHours(hours),
    setHours: (value: AlertWindowHours) => setHours(value),
  };
};
