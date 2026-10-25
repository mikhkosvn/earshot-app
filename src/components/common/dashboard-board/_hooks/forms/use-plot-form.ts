'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { PlotConfig } from '@/server/dashboards/types';

import { DraftActionType } from '../../_constants/draft-action-type';
import {
  plotFormSchema,
  type PlotFormValues,
} from '../../_schemas/plot-form-schema';
import type { DashboardBoardState } from '../../_utils/board-types';
import {
  emptyPlotForm,
  toPlotConfigValues,
  toPlotFormValues,
} from '../../_utils/plot-form-values';

type PlotFormTarget = {
  key: string;
  config: PlotConfig;
} | null;

const defaultValuesOf = (
  board: DashboardBoardState,
  target: PlotFormTarget,
) => {
  if (!target) return emptyPlotForm(board.source);
  return toPlotFormValues(target.config);
};

export const usePlotForm = (
  board: DashboardBoardState,
  target: PlotFormTarget,
  onDone: () => void,
) => {
  const form = useForm<PlotFormValues>({
    resolver: zodResolver(plotFormSchema),
    defaultValues: defaultValuesOf(board, target),
  });

  const onSubmit = form.handleSubmit((values) => {
    const config = toPlotConfigValues(values);
    if (!config) return;
    if (target) {
      board.dispatch({ type: DraftActionType.update, key: target.key, config });
    } else {
      board.dispatch({
        type: DraftActionType.add,
        key: crypto.randomUUID(),
        config,
      });
    }
    onDone();
  });

  return { form, onSubmit };
};
