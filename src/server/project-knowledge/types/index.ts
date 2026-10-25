import type { z } from 'zod';

import type {
  projectKnowledgeContentSchema,
  projectKnowledgeIdSchema,
  saveProjectKnowledgeSchema,
} from '@/server/project-knowledge/schemas';

export type ProjectKnowledgeIdInput = z.input<typeof projectKnowledgeIdSchema>;
export type SaveProjectKnowledgeInput = z.input<
  typeof saveProjectKnowledgeSchema
>;
export type ProjectKnowledgeFormValues = z.input<
  typeof projectKnowledgeContentSchema
>;

export type ProjectKnowledge = {
  content: string;
  exists: boolean;
  version: number | null;
};

export type ProjectKnowledgeVersionRow = {
  id: number;
  version: number;
  content: string;
  createdAt: Date;
  createdByName: string | null;
};
