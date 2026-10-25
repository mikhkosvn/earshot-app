'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import {
  AlertTypeDescription,
  AlertTypeLabel,
} from '@/server/alerts/constants/alert-type-labels';
import type { AlertRow } from '@/server/alerts/types';

import { useEditAlertForm } from '../../_hooks/forms/use-edit-alert-form';
import { AlertNameField } from '../params/alert-name-field';
import { AlertParamsFields } from '../params/alert-params-fields';

type EditAlertFormProps = {
  alert: AlertRow;
  onSaved: () => void;
};

export function EditAlertForm({ alert, onSaved }: EditAlertFormProps) {
  const { form, onSubmit, isSaving } = useEditAlertForm(alert, onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium">
            {alert.metric.name} · {AlertTypeLabel[alert.type]}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {AlertTypeDescription[alert.type]}
          </p>
        </div>
        <AlertNameField placeholder={alert.metric.name} />
        <AlertParamsFields />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isSaving}>
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
