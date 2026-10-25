import { JobKind } from '@/generated/prisma/enums';

export const recentJobsLabel = (kind: JobKind) => {
  if (kind === JobKind.export) return 'Recent Exports';
  return 'Recent';
};

export const removeTaskLabel = (kind: JobKind) => {
  if (kind === JobKind.export) return 'Remove export';
  return 'Remove task';
};
