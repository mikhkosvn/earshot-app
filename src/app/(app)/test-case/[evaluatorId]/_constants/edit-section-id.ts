export const EditSectionId = {
  basics: 'basics',
  criteria: 'evaluation-criteria',
  configuration: 'configuration',
} as const;

export type EditSectionId = (typeof EditSectionId)[keyof typeof EditSectionId];

export const EDIT_SECTIONS = [
  { id: EditSectionId.basics, label: 'Basics' },
  { id: EditSectionId.criteria, label: 'Evaluation Criteria' },
  { id: EditSectionId.configuration, label: 'Configuration' },
] as const;
