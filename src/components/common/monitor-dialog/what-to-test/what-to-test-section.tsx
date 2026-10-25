import { MonitorFormSection } from '../form/monitor-form-section';
import { AgentField } from './agent-field';
import { ExecutionModeField } from './execution-mode-field';
import { MonitorNameField } from './monitor-name-field';
import { PersonalityOverrideField } from './personality-override-field';
import { ScenariosField } from './scenarios-field';

export function WhatToTestSection() {
  return (
    <MonitorFormSection title="What to test">
      <MonitorNameField />
      <AgentField />
      <ExecutionModeField />
      <ScenariosField />
      <PersonalityOverrideField />
    </MonitorFormSection>
  );
}
