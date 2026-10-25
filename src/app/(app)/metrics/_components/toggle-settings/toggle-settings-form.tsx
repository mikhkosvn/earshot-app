'use client';

import { useIsMutating } from '@tanstack/react-query';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { MetricFlag } from '../../_constants/metric-flag';
import { useToggleSettingsForm } from '../../_hooks/forms/use-toggle-settings-form';
import { MetricService } from '../../_service';
import { FlagChangeField } from './flag-change-field';

interface ToggleSettingsFormProps {
  metricIds: number[];
  onSaved: () => void;
}

export function ToggleSettingsForm({
  metricIds,
  onSaved,
}: ToggleSettingsFormProps) {
  const { form, onSubmit } = useToggleSettingsForm(metricIds, onSaved);
  const isSaving =
    useIsMutating({ mutationKey: MetricService.bulkUpdateFlagsMutationKey }) >
    0;

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-col gap-3 p-3">
          {Object.values(MetricFlag).map((flag) => (
            <FlagChangeField key={flag} flag={flag} />
          ))}
        </div>
        <div className="flex justify-end gap-2 border-t p-3">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isSaving}>
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
