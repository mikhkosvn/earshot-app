import type {
  DashboardDetail,
  DashboardFilterState,
  PlotConfig,
} from '@/server/dashboards/types';

import { DraftActionType } from '../_constants/draft-action-type';

export interface DraftPlot {
  key: string;
  id: number | null;
  config: PlotConfig;
  isNew: boolean;
  isEdited: boolean;
}

export interface DashboardDraft {
  savedOrder: number[];
  savedFilters: DashboardFilterState;
  plots: DraftPlot[];
  deletedIds: number[];
  filters: DashboardFilterState;
}

export type DraftAction =
  | { type: typeof DraftActionType.add; key: string; config: PlotConfig }
  | { type: typeof DraftActionType.update; key: string; config: PlotConfig }
  | { type: typeof DraftActionType.duplicate; key: string; newKey: string }
  | { type: typeof DraftActionType.remove; key: string }
  | { type: typeof DraftActionType.move; fromKey: string; toKey: string }
  | {
      type: typeof DraftActionType.setFilters;
      filters: DashboardFilterState;
    }
  | { type: typeof DraftActionType.reset; detail: DashboardDetail };

export const initDraft = (detail: DashboardDetail): DashboardDraft => ({
  savedOrder: detail.widgets.map((widget) => widget.id),
  savedFilters: detail.filters,
  plots: detail.widgets.map((widget) => ({
    key: `w${widget.id}`,
    id: widget.id,
    config: widget.config,
    isNew: false,
    isEdited: false,
  })),
  deletedIds: [],
  filters: detail.filters,
});

const updatePlot = (
  state: DashboardDraft,
  key: string,
  config: PlotConfig,
) => ({
  ...state,
  plots: state.plots.map((plot) => {
    if (plot.key !== key) return plot;
    return { ...plot, config, isEdited: !plot.isNew };
  }),
});

const duplicatePlot = (state: DashboardDraft, key: string, newKey: string) => {
  const index = state.plots.findIndex((plot) => plot.key === key);
  if (index === -1) return state;
  const source = state.plots[index];
  const copy: DraftPlot = {
    key: newKey,
    id: null,
    config: { ...source.config, name: `${source.config.name} (Copy)` },
    isNew: true,
    isEdited: false,
  };
  return {
    ...state,
    plots: [
      ...state.plots.slice(0, index + 1),
      copy,
      ...state.plots.slice(index + 1),
    ],
  };
};

const removePlot = (state: DashboardDraft, key: string) => {
  const plot = state.plots.find((item) => item.key === key);
  if (!plot) return state;
  const deletedIds = [...state.deletedIds];
  if (plot.id !== null) deletedIds.push(plot.id);
  return {
    ...state,
    plots: state.plots.filter((item) => item.key !== key),
    deletedIds,
  };
};

const movePlot = (state: DashboardDraft, fromKey: string, toKey: string) => {
  const from = state.plots.findIndex((plot) => plot.key === fromKey);
  const to = state.plots.findIndex((plot) => plot.key === toKey);
  if (from === -1 || to === -1 || from === to) return state;
  const plots = [...state.plots];
  const [moved] = plots.splice(from, 1);
  plots.splice(to, 0, moved);
  return { ...state, plots };
};

export const draftReducer = (
  state: DashboardDraft,
  action: DraftAction,
): DashboardDraft => {
  switch (action.type) {
    case DraftActionType.add:
      return {
        ...state,
        plots: [
          ...state.plots,
          {
            key: action.key,
            id: null,
            config: action.config,
            isNew: true,
            isEdited: false,
          },
        ],
      };
    case DraftActionType.update:
      return updatePlot(state, action.key, action.config);
    case DraftActionType.duplicate:
      return duplicatePlot(state, action.key, action.newKey);
    case DraftActionType.remove:
      return removePlot(state, action.key);
    case DraftActionType.move:
      return movePlot(state, action.fromKey, action.toKey);
    case DraftActionType.setFilters:
      return { ...state, filters: action.filters };
    case DraftActionType.reset:
      return initDraft(action.detail);
    default: {
      const unhandled: never = action;
      return unhandled;
    }
  }
};
