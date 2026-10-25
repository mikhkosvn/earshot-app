import {
  ProposalField,
  ProposalFieldLabel,
} from '@/server/metric-optimizer/constants/proposal-field';
import type { ProposalChange } from '@/server/metric-optimizer/types';

export type ProposalDefinition = {
  type: string;
  description: string | null;
  customCode: string | null;
  evaluationTrigger: string;
  triggerType: string;
  evaluationTriggerPrompt: string | null;
  evaluationTriggerCustomCode: string | null;
};

const FIELDS: ProposalField[] = Object.values(ProposalField);

const textOf = (value: string | null) => value ?? '';

export const proposalChanges = (
  current: ProposalDefinition,
  proposed: ProposalDefinition,
): ProposalChange[] =>
  FIELDS.flatMap((field) => {
    const before = textOf(current[field]);
    const after = textOf(proposed[field]);
    if (before.trim() === after.trim()) return [];
    return [{ field, label: ProposalFieldLabel[field], before, after }];
  });
