'use client';

import { useState } from 'react';

import { CRON_PARTS } from '../../_constants/cron-help';
import { useMonitorFormContext } from '../../_hooks/use-monitor-form-context';
import {
  joinCronParts,
  replaceCronPart,
  toCronParts,
} from '../../_utils/schedule/cron-parts';
import { changeCronExpression } from '../../_utils/schedule/schedule-transitions';
import { CronDescription } from './cron-description';
import { CronPartInput } from './cron-part-input';
import { QuickScheduleSelect } from './quick-schedule-select';

export function CronBuilder() {
  const form = useMonitorFormContext();
  const [parts, setParts] = useState(() =>
    toCronParts(form.getValues('cronExpression')),
  );

  const changeParts = (nextParts: string[]) => {
    setParts(nextParts);
    changeCronExpression(form, joinCronParts(nextParts));
  };

  return (
    <div className="flex flex-col gap-3">
      <QuickScheduleSelect
        parts={parts}
        onSelect={(cron) => changeParts(toCronParts(cron))}
      />
      <CronDescription />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {CRON_PARTS.map((part, index) => (
          <CronPartInput
            key={part.label}
            index={index}
            part={part}
            value={parts[index]}
            onValueChange={(value) =>
              changeParts(replaceCronPart(parts, index, value))
            }
          />
        ))}
      </div>
    </div>
  );
}
