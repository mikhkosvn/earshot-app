'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { FilterLogic } from '@/server/evaluators/constants/evaluator-list';

import { EvaluatorService } from '../../_service';
import { FilterLogicSelect } from './filter-logic-select';
import { FilterOptionList } from './filter-option-list';

type MetricFilterPanelProps = {
  value: number[];
  onValueChange: (metricIds: number[]) => void;
  logic: FilterLogic;
  onLogicChange: (logic: FilterLogic) => void;
};

export function MetricFilterPanel({
  value,
  onValueChange,
  logic,
  onLogicChange,
}: MetricFilterPanelProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...EvaluatorService.getMetricsQuery({ projectId }),
    select: (metrics) =>
      metrics.map((metric) => ({ value: metric.id, label: metric.name })),
  });

  return (
    <FilterOptionList
      name="metrics"
      options={options}
      value={value}
      onValueChange={onValueChange}
      logicSelect={
        <FilterLogicSelect value={logic} onValueChange={onLogicChange} />
      }
    />
  );
}
