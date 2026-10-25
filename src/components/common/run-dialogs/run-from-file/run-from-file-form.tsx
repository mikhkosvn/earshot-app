'use client';

import { useRunFromFileForm } from '../_hooks/use-run-from-file-form';
import { SpecCheckStatus } from './check/spec-check-status';
import { RunFromFileFooter } from './run-from-file-footer';
import { SpecSourceTabs } from './source/spec-source-tabs';
import { SpecAgentField } from './spec-agent-field';
import { SpecChannelField } from './spec-channel-field';

interface RunFromFileFormProps {
  onStarted: (resultId: number) => void;
}

export function RunFromFileForm({ onStarted }: RunFromFileFormProps) {
  const { form, onSubmit } = useRunFromFileForm({ onStarted });

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-0 flex-col gap-4"
      noValidate
    >
      <div className="-mx-4 flex flex-col gap-4 overflow-y-auto px-4">
        <div className="flex flex-col gap-1.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <SpecAgentField control={form.control} />
            <SpecChannelField control={form.control} />
          </div>
          <p className="text-xs text-muted-foreground">
            The file describes what to test. These pick what it runs against.
          </p>
        </div>
        <SpecSourceTabs form={form} />
        <SpecCheckStatus control={form.control} />
      </div>
      <RunFromFileFooter form={form} />
    </form>
  );
}
