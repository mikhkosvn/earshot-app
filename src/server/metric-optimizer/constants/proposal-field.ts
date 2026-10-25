export const ProposalField = {
  type: 'type',
  description: 'description',
  customCode: 'customCode',
  evaluationTrigger: 'evaluationTrigger',
  triggerType: 'triggerType',
  evaluationTriggerPrompt: 'evaluationTriggerPrompt',
  evaluationTriggerCustomCode: 'evaluationTriggerCustomCode',
} as const;

export type ProposalField = (typeof ProposalField)[keyof typeof ProposalField];

export const ProposalFieldLabel: Record<ProposalField, string> = {
  [ProposalField.type]: 'Metric type',
  [ProposalField.description]: 'Description',
  [ProposalField.customCode]: 'Custom code',
  [ProposalField.evaluationTrigger]: 'Evaluation trigger',
  [ProposalField.triggerType]: 'Trigger type',
  [ProposalField.evaluationTriggerPrompt]: 'Evaluation trigger (prompt)',
  [ProposalField.evaluationTriggerCustomCode]: 'Evaluation trigger (code)',
};

export const INLINE_PROPOSAL_FIELDS: ProposalField[] = [
  ProposalField.type,
  ProposalField.evaluationTrigger,
  ProposalField.triggerType,
];
