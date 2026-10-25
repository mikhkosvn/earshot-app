'use client';

import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import type { PlotConfig } from '@/server/dashboards/types';

import { usePlotForm } from '../_hooks/forms/use-plot-form';
import type { DashboardBoardState } from '../_utils/board-types';
import { DataFieldSelect } from './fields/data-field-select';
import { PlotFormDetails } from './plot-form-details';
import { PlotFormSubmit } from './plot-form-submit';

interface PlotFormProps {
  board: DashboardBoardState;
  target: { key: string; config: PlotConfig } | null;
  submitLabel: string;
  onDone: () => void;
  children?: ReactNode;
}

export function PlotForm({
  board,
  target,
  submitLabel,
  onDone,
  children,
}: PlotFormProps) {
  const { form, onSubmit } = usePlotForm(board, target, onDone);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-3">
          {children}
          <DataFieldSelect source={board.source} />
          <PlotFormDetails source={board.source} />
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <PlotFormSubmit label={submitLabel} />
        </div>
      </form>
    </FormProvider>
  );
}
