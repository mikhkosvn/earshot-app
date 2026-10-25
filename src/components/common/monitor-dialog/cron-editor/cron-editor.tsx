'use client';

import { useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { ScheduleMode } from '../_constants/schedule-mode';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { CronEditorBody } from './cron-editor-body';
import { CronExpressionCode } from './cron-expression-code';
import { CronExpressionError } from './cron-expression-error';
import { CronHelp } from './cron-help';
import { CronModeButtonLabel } from './cron-mode-button-label';

export function CronEditor() {
  const { control } = useMonitorFormContext();
  const scheduleMode = useWatch({ control, name: 'scheduleMode' });
  const [isManual, setManual] = useState(false);
  if (scheduleMode !== ScheduleMode.custom) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CronExpressionCode />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setManual(!isManual)}
          >
            <CronModeButtonLabel isManual={isManual} />
          </Button>
        </div>
        <CronEditorBody isManual={isManual} />
        <CronExpressionError />
      </div>
      <CronHelp />
    </div>
  );
}
