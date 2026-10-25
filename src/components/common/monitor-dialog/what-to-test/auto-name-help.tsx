'use client';

import { useWatch } from 'react-hook-form';

import { AUTO_NAME_HELP } from '../_constants/monitor-dialog-text';
import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';
import { MonitorFieldText } from '../form/monitor-field-text';

export function AutoNameHelp() {
  const { control } = useMonitorFormContext();
  const autoName = useWatch({ control, name: 'autoName' });
  if (!autoName) return null;

  return <MonitorFieldText>{AUTO_NAME_HELP}</MonitorFieldText>;
}
