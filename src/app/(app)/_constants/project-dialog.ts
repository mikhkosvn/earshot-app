export const ProjectDialog = {
  create: 'create',
  edit: 'edit',
  delete: 'delete',
} as const;

export type ProjectDialog = (typeof ProjectDialog)[keyof typeof ProjectDialog];
