'use client';

import { useWatch } from 'react-hook-form';

import { useMonitorFormContext } from './use-monitor-form-context';

export const useCallsPerRun = () => {
  const { control } = useMonitorFormContext();
  const [evaluatorIds, frequency] = useWatch({
    control,
    name: ['evaluatorIds', 'frequency'],
  });
  const repeats = Number.isFinite(frequency) ? frequency : 0;
  return {
    scenarios: evaluatorIds.length,
    repeats,
    callsPerRun: evaluatorIds.length * repeats,
  };
};
