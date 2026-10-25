export const VariableEditorMode = {
  table: 'table',
  json: 'json',
} as const;

export type VariableEditorMode =
  (typeof VariableEditorMode)[keyof typeof VariableEditorMode];

export const VariableListName = {
  mainAgent: 'mainAgentVariables',
  testingAgent: 'testingAgentVariables',
} as const;

export type VariableListName =
  (typeof VariableListName)[keyof typeof VariableListName];
