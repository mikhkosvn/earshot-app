'use client';

import { useWatch } from 'react-hook-form';

import { describeCron } from '@/components/common/monitor-dialog/_utils/schedule/describe-cron';
import type { OptimizerScheduleFields } from '@/server/metric-optimizer/types';

export function ScheduleCronDescription() {
  const expression = useWatch<OptimizerScheduleFields, 'cronExpression'>({
    name: 'cronExpression',
  });
  const description = describeCron(expression);

  if (!description) return null;

  return <p className="text-xs text-foreground">Runs {description}.</p>;
}
