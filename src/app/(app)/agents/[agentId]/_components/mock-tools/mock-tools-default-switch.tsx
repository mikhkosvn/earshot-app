'use client';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

import { useSetMockToolsEnabledMutation } from '../../_hooks/mutations/mock-tools/use-set-mock-tools-enabled-mutation';
import { useAgent } from '../../_hooks/use-agent';

const FIELD_ID = 'mock-tools-enabled';

export function MockToolsDefaultSwitch() {
  const agent = useAgent();
  const setEnabled = useSetMockToolsEnabledMutation();

  return (
    <Field
      orientation="horizontal"
      className="items-center gap-4 rounded-lg border p-3"
    >
      <FieldContent>
        <FieldLabel htmlFor={FIELD_ID} className="text-xs">
          Enable Mock Tools by Default
        </FieldLabel>
        <FieldDescription className="text-xs">
          Automatically select all configured mock tools when configuring a run
        </FieldDescription>
      </FieldContent>
      <Switch
        id={FIELD_ID}
        checked={agent.mockToolsEnabled}
        disabled={setEnabled.isPending}
        onCheckedChange={(enabled) =>
          setEnabled.mutate({ agentId: agent.id, enabled })
        }
      />
    </Field>
  );
}
