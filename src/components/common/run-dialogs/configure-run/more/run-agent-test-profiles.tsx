'use client';

import { useWatch } from 'react-hook-form';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { RunTestProfilesField } from './run-test-profiles-field';

interface RunAgentTestProfilesProps {
  control: RunSettingsForm['control'];
}

export function RunAgentTestProfiles({ control }: RunAgentTestProfilesProps) {
  const agentId = useWatch({ control, name: 'agentId' });
  if (!agentId) return null;
  return <RunTestProfilesField control={control} agentId={agentId} />;
}
