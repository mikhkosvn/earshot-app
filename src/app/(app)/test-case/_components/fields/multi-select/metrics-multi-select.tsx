'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionMultiSelect } from './option-multi-select';

interface MetricsMultiSelectProps {
  id?: string;
  value: readonly number[];
  onValueChange: (metricIds: number[]) => void;
  placeholder?: string;
}

export function MetricsMultiSelect({
  id,
  value,
  onValueChange,
  placeholder = 'Select metrics',
}: MetricsMultiSelectProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...EvaluatorService.getMetricsQuery({ projectId }),
    select: (metrics) =>
      metrics.map((metric) => ({ value: metric.id, label: metric.name })),
  });

  return (
    <OptionMultiSelect
      id={id}
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  );
}
