'use client';

import { Controller, FormProvider } from 'react-hook-form';

import { LabeledField } from '@/app/(app)/test-case/_components/fields/labeled-field';
import { AgentSelect } from '@/app/(app)/test-case/_components/fields/selects/agent-select';
import { FolderSelect } from '@/app/(app)/test-case/_components/fields/selects/folder-select';
import { FOLDER_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useTranscriptForm } from '../../_hooks/use-transcript-form';
import { TranscriptConversation } from './transcript-conversation';

export function TranscriptModePanel() {
  const { form, onSubmit, isPending } = useTranscriptForm();

  return (
    <div className="flex justify-center p-4 md:p-6">
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex w-full max-w-4xl flex-col rounded-xl border bg-background"
        >
          <div className="flex flex-col gap-4 border-b p-4">
            <div>
              <h2 className="text-base font-semibold">From Transcript</h2>
              <p className="text-sm text-muted-foreground">
                Replay a past call as an evaluator. Paste or type the
                back-and-forth between your agent and the caller.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Controller
                name="agentId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <LabeledField
                    id="transcript-agent"
                    label="Agent"
                    description="The agent this evaluator will test"
                    required
                    error={fieldState.error}
                  >
                    <AgentSelect
                      id="transcript-agent"
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </LabeledField>
                )}
              />
              <Controller
                name="folderPath"
                control={form.control}
                render={({ field, fieldState }) => (
                  <LabeledField
                    id="transcript-folder"
                    label="Folder"
                    description={FOLDER_HELP}
                    required
                    error={fieldState.error}
                  >
                    <FolderSelect
                      id="transcript-folder"
                      value={field.value}
                      onValueChange={(next) => field.onChange(next ?? '')}
                    />
                  </LabeledField>
                )}
              />
            </div>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <LabeledField id="transcript-name" label="Name (optional)">
                  <Input
                    {...field}
                    id="transcript-name"
                    placeholder="e.g. Billing reschedule replay"
                  />
                </LabeledField>
              )}
            />
          </div>
          <TranscriptConversation />
          <div className="flex justify-end border-t p-3">
            <Button type="submit" disabled={isPending}>
              Create Evaluator
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
