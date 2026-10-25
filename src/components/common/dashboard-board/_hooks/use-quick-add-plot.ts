'use client';

import { toast } from 'sonner';

import type { PredefinedPlot } from '@/server/dashboards/constants/predefined-plots';

import { DraftActionType } from '../_constants/draft-action-type';
import type { DashboardBoardState } from '../_utils/board-types';
import { usePlotMetricsQuery } from './queries/use-plot-metrics-query';

export const useQuickAddPlot = (
  board: DashboardBoardState,
  onDone: () => void,
) => {
  const { data: metrics } = usePlotMetricsQuery();

  return (preset: PredefinedPlot) => {
    const metric = metrics.find(
      (item) => item.functionName === preset.metricFunction,
    );
    if (preset.metricFunction && !metric) {
      toast.error('This project has no metric for this plot.');
      return;
    }
    board.dispatch({
      type: DraftActionType.add,
      key: crypto.randomUUID(),
      config: { ...preset.config, metricId: metric?.id ?? null },
    });
    onDone();
  };
};
