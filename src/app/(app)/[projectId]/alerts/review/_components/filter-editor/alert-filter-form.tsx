'use client';

import { Suspense } from 'react';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { AlertRow } from '@/server/alerts/types';

import { useAlertFilterForm } from '../../_hooks/forms/use-alert-filter-form';
import { FilterAgentList } from './filter-agent-list';
import { FilterMetadataRows } from './filter-metadata-rows';

type AlertFilterFormProps = {
  alert: AlertRow;
  onSaved: () => void;
};

export function AlertFilterForm({ alert, onSaved }: AlertFilterFormProps) {
  const { form, onSubmit, isSaving } = useAlertFilterForm(alert, onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <FilterAgentList />
        </Suspense>
        <FilterMetadataRows />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => form.reset({ agentIds: [], metadata: [] })}
          >
            Clear
          </Button>
          <Button type="submit" size="sm" disabled={isSaving}>
            Apply
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
