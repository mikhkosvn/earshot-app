import { format } from 'date-fns';

import type { ProjectKnowledgeVersionRow } from '@/server/project-knowledge/types';

export const formatVersionMeta = (version: ProjectKnowledgeVersionRow) => {
  const date = format(version.createdAt, "MMM d, yyyy 'at' h:mm a");
  if (!version.createdByName) return date;
  return `${date} · ${version.createdByName}`;
};
