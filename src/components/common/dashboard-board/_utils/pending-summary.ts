import type { DashboardDraft } from './dashboard-draft';

const sameFilters = (draft: DashboardDraft) =>
  JSON.stringify(draft.filters) === JSON.stringify(draft.savedFilters);

const orderChanged = (draft: DashboardDraft) => {
  const kept = draft.plots.flatMap((plot) => {
    if (plot.id === null) return [];
    return [plot.id];
  });
  const savedKept = draft.savedOrder.filter((id) => kept.includes(id));
  return kept.some((id, index) => savedKept[index] !== id);
};

const changedPlotCount = (draft: DashboardDraft) =>
  draft.plots.filter((plot) => plot.isNew || plot.isEdited).length +
  draft.deletedIds.length;

const plotWord = (count: number) => {
  if (count === 1) return 'plot';
  return 'plots';
};

export const pendingLabel = (draft: DashboardDraft) => {
  const count = changedPlotCount(draft);
  if (count > 0) return `Unsaved changes (${count} ${plotWord(count)})`;
  if (orderChanged(draft)) return 'Unsaved changes (layout)';
  return 'Unsaved changes (filters)';
};

export const hasPendingChanges = (draft: DashboardDraft) =>
  changedPlotCount(draft) > 0 || orderChanged(draft) || !sameFilters(draft);
