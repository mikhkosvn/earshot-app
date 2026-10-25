export const VariableEditorMode = {
  form: 'form',
  json: 'json',
} as const;

export type VariableEditorMode =
  (typeof VariableEditorMode)[keyof typeof VariableEditorMode];

export const VARIABLE_EDITOR_MODE_LABEL: Record<VariableEditorMode, string> = {
  [VariableEditorMode.form]: 'Form',
  [VariableEditorMode.json]: 'Json',
};

export const EMPTY_VARIABLE = { name: '', description: '' };
