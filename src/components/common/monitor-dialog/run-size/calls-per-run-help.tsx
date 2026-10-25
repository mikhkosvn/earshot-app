'use client';

import { REPEAT_HELP } from '../_constants/monitor-dialog-text';
import { useCallsPerRun } from '../_hooks/use-calls-per-run';
import { scenarioUnit } from '../_utils/form/call-count-label';
import { MonitorFieldText } from '../form/monitor-field-text';

export function CallsPerRunHelp() {
  const { scenarios, repeats, callsPerRun } = useCallsPerRun();
  if (scenarios === 0)
    return <MonitorFieldText>{REPEAT_HELP}</MonitorFieldText>;

  return (
    <MonitorFieldText>
      {scenarios} {scenarioUnit(scenarios)} × {repeats} = {callsPerRun} calls
      per run
    </MonitorFieldText>
  );
}
