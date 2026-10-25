'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { CallEvaluationStatusLabel } from '@/server/results/constants/call-evaluation-status-labels';
import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import type { ResultFilterOptions } from '@/server/results/types';

import { ResultService } from '../../_service';
import { ResultFilterField } from '../../_utils/results-list/filter-drafts';

const labelItems = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

const STATUS_ITEMS = labelItems(RunStatusLabel);

const EVALUATION_ITEMS = labelItems(CallEvaluationStatusLabel);

const valueItems = (field: ResultFilterField, options: ResultFilterOptions) => {
  if (field === ResultFilterField.status) return STATUS_ITEMS;
  if (field === ResultFilterField.evaluation) return EVALUATION_ITEMS;
  if (field === ResultFilterField.tag) {
    return options.tags.map((tag) => ({ value: tag, label: tag }));
  }
  if (field === ResultFilterField.evaluator) {
    return options.evaluators.map((evaluator) => ({
      value: String(evaluator.id),
      label: evaluator.name,
    }));
  }
  return options.agents.map((agent) => ({
    value: String(agent.id),
    label: agent.name,
  }));
};

export const useResultFilterValueItems = (field: ResultFilterField) => {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery(
    ResultService.getFilterOptionsQuery({ projectId }),
  );
  return valueItems(field, options);
};
