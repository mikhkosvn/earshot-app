'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../_service';
import { FilterOptionList } from './filter-option-list';

interface PersonalityFilterPanelProps {
  value: readonly number[];
  onValueChange: (personalityIds: number[]) => void;
}

export function PersonalityFilterPanel({
  value,
  onValueChange,
}: PersonalityFilterPanelProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...EvaluatorService.getPersonalitiesQuery({ projectId }),
    select: (personalities) =>
      personalities.map((personality) => ({
        value: personality.id,
        label: personality.name,
      })),
  });

  return (
    <FilterOptionList
      name="personalities"
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
