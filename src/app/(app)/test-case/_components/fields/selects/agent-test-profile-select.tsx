'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../../_service';
import { OptionIdLabel } from '../option-id-label';
import { OptionSelect } from '../option-select';

interface AgentTestProfileSelectProps {
  id?: string;
  agentId: number;
  value: number | null;
  onValueChange: (testProfileId: number | null) => void;
  placeholder?: string;
  invalid?: boolean;
}

export function AgentTestProfileSelect({
  id,
  agentId,
  value,
  onValueChange,
  placeholder = 'Select Test Profile',
  invalid,
}: AgentTestProfileSelectProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getTestProfilesQuery({ projectId, agentId }),
    select: (profiles) =>
      profiles.map((profile) => ({
        value: profile.id,
        label: <OptionIdLabel id={profile.id} label={profile.name} />,
      })),
  });

  return (
    <OptionSelect
      id={id}
      items={[{ value: null, label: 'None' }, ...items]}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      invalid={invalid}
    />
  );
}
