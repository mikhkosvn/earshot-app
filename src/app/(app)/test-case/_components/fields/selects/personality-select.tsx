'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { LanguageLabel } from '@/server/agents/constants/language-labels';

import { EvaluatorService } from '../../../_service';
import { OptionIdLabel } from '../option-id-label';
import { OptionSelect } from '../option-select';

interface PersonalitySelectProps {
  id?: string;
  value: number | null;
  onValueChange: (personalityId: number | null) => void;
  invalid?: boolean;
}

export function PersonalitySelect({
  id,
  value,
  onValueChange,
  invalid,
}: PersonalitySelectProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getPersonalitiesQuery({ projectId }),
    select: (personalities) =>
      personalities.map((personality) => ({
        value: personality.id,
        label: (
          <OptionIdLabel
            id={personality.id}
            label={`${personality.name} (${LanguageLabel[personality.language]})`}
          />
        ),
      })),
  });

  return (
    <OptionSelect
      id={id}
      items={items}
      value={value}
      onValueChange={onValueChange}
      placeholder="Select Personality"
      invalid={invalid}
    />
  );
}
