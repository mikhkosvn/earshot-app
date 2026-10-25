'use client';

import { ArrowLeftRightIcon, UserIcon } from 'lucide-react';
import { Controller, FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { TestProfileView } from '@/server/test-profiles/types';

import { VariableListName } from '../../../_constants/variable-editor-mode';
import { useTestProfileForm } from '../../../_hooks/test-profiles/use-test-profile-form';
import { LabeledField } from '../../fields/labeled-field';
import { AgentSelect } from '../../fields/selects/agent-select';
import { TestProfileSubmitButton } from './test-profile-submit-button';
import { VariableCount } from './variables/variable-count';
import { VariableSection } from './variables/variable-section';

type TestProfileFormProps = {
  profile: TestProfileView | null;
  defaultAgentId: number | null;
  onSaved: (profileId: number) => void;
};

export function TestProfileForm({
  profile,
  defaultAgentId,
  onSaved,
}: TestProfileFormProps) {
  const { form, onSubmit, isPending } = useTestProfileForm(
    profile,
    defaultAgentId,
    onSaved,
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <LabeledField
                id="test-profile-name"
                label="Name"
                error={fieldState.error}
              >
                <Input
                  {...field}
                  id="test-profile-name"
                  placeholder="e.g. Delayed order — David"
                />
              </LabeledField>
            )}
          />
          <Controller
            name="agentId"
            control={form.control}
            render={({ field, fieldState }) => (
              <LabeledField
                id="test-profile-agent"
                label="Agent"
                required
                error={fieldState.error}
              >
                <AgentSelect
                  id="test-profile-agent"
                  value={field.value}
                  onValueChange={field.onChange}
                  invalid={fieldState.invalid}
                />
              </LabeledField>
            )}
          />
        </div>
        <VariableSection
          name={VariableListName.mainAgent}
          title="Main agent variables"
          subtitle="Sent to the agent under test, over the wire"
          icon={<ArrowLeftRightIcon className="size-4 text-blue-600" />}
        />
        <VariableSection
          name={VariableListName.testingAgent}
          title="Testing agent variables"
          subtitle="Persona & context used by the simulated caller"
          icon={<UserIcon className="size-4 text-purple-600" />}
        />
        <DialogFooter className="items-center sm:justify-between">
          <VariableCount />
          <div className="flex gap-2">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <TestProfileSubmitButton profile={profile} isPending={isPending} />
          </div>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
