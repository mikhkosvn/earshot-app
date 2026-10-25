export const LabTestSetsActionOperation = {
  addConversationToLab: 'lab_test_sets.add_conversation_to_lab',
  addRunsToLab: 'lab_test_sets.add_runs_to_lab',
} as const;

export type LabTestSetsActionOperation =
  (typeof LabTestSetsActionOperation)[keyof typeof LabTestSetsActionOperation];
