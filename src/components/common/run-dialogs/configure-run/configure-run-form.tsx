'use client';

import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  RUN_FREQUENCY_MAX,
  RUN_FREQUENCY_MIN,
} from '@/server/runs/constants/run-limits';

import { useConfigureRunForm } from '../_hooks/use-configure-run-form';
import { ConfigureRunFooter } from './configure-run-footer';
import { RunAgentField } from './fields/run-agent-field';
import { RunConnectionTiles } from './fields/run-connection-tiles';
import { RunLabelField } from './fields/run-label-field';
import { RunMockToolsField } from './fields/run-mock-tools-field';
import { RunNumberField } from './fields/run-number-field';
import { RunPhoneNumberField } from './fields/run-phone-number-field';
import { SkippedMetricsWarning } from './fields/skipped-metrics-warning';
import { MoreRunFields } from './more/more-run-fields';

type ConfigureRunFormProps = {
  evaluatorIds: number[];
  onStarted: (resultId: number) => void;
};

export function ConfigureRunForm({
  evaluatorIds,
  onStarted,
}: ConfigureRunFormProps) {
  const { form, onSubmit } = useConfigureRunForm({ evaluatorIds, onStarted });
  const { control } = form;

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-0 flex-col gap-4"
      noValidate
    >
      <div className="-mx-4 flex flex-col gap-4 overflow-y-auto px-4">
        <RunAgentField form={form} evaluatorIds={evaluatorIds} />
        <RunLabelField control={control} />
        <RunNumberField
          control={control}
          name="frequency"
          label="Number of Times to Run"
          description="Provide number of times each evaluator will run."
          min={RUN_FREQUENCY_MIN}
          max={RUN_FREQUENCY_MAX}
        />
        <Suspense fallback={<Skeleton className="h-9 w-full" />}>
          <SkippedMetricsWarning
            control={control}
            evaluatorIds={evaluatorIds}
          />
        </Suspense>
        <RunConnectionTiles />
        <div className="overflow-hidden rounded-lg border">
          <div className="flex flex-col gap-4 p-3">
            <RunPhoneNumberField control={control} />
            <Suspense fallback={<Skeleton className="h-14 w-full" />}>
              <RunMockToolsField
                control={control}
                evaluatorIds={evaluatorIds}
              />
            </Suspense>
          </div>
          <MoreRunFields control={control} />
        </div>
      </div>
      <ConfigureRunFooter evaluatorIds={evaluatorIds} />
    </form>
  );
}
