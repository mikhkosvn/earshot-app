'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { profileKeyToken } from '@/app/(app)/test-case/_utils/variable-tokens';

import { VariableChips } from './variable-chips';

type AgentProfileVariableChipsProps = {
  agentId: number;
  testProfileId: number;
  baseTokens: string[];
  onInsert: (token: string) => void;
};

export function AgentProfileVariableChips({
  agentId,
  testProfileId,
  baseTokens,
  onInsert,
}: AgentProfileVariableChipsProps) {
  const projectId = useCurrentProjectId();
  const { data: keyTokens } = useSuspenseQuery({
    ...EvaluatorService.getTestProfilesQuery({ projectId, agentId }),
    select: (profiles) => {
      const profile = profiles.find((item) => item.id === testProfileId);
      const keys = [
        ...(profile?.testingAgentVariables ?? []),
        ...(profile?.mainAgentVariables ?? []),
      ].map((variable) => variable.key);
      return [...new Set(keys)].map(profileKeyToken);
    },
  });

  return (
    <VariableChips
      tokens={[...baseTokens.slice(0, 1), ...keyTokens, ...baseTokens.slice(1)]}
      onInsert={onInsert}
    />
  );
}
