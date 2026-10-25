'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { FilterLogic } from '@/server/evaluators/constants/evaluator-list';

import { EvaluatorService } from '../../_service';
import { FilterLogicSelect } from './filter-logic-select';
import { FilterOptionList } from './filter-option-list';

type TagFilterPanelProps = {
  value: string[];
  onValueChange: (tags: string[]) => void;
  logic: FilterLogic;
  onLogicChange: (logic: FilterLogic) => void;
};

export function TagFilterPanel({
  value,
  onValueChange,
  logic,
  onLogicChange,
}: TagFilterPanelProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...EvaluatorService.getTagsQuery({ projectId }),
    select: (tags) => tags.map((tag) => ({ value: tag, label: tag })),
  });

  return (
    <FilterOptionList
      name="tags"
      options={options}
      value={value}
      onValueChange={onValueChange}
      logicSelect={
        <FilterLogicSelect value={logic} onValueChange={onLogicChange} />
      }
    />
  );
}
