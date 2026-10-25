'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionMultiSelect } from './option-multi-select';

type PersonalityMultiSelectProps = {
  id?: string;
  value: number[];
  onValueChange: (personalityIds: number[]) => void;
  placeholder: string;
};

export function PersonalityMultiSelect({
  id,
  value,
  onValueChange,
  placeholder,
}: PersonalityMultiSelectProps) {
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
    <OptionMultiSelect
      id={id}
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  );
}
