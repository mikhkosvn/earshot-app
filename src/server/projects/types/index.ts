import type { z } from 'zod';

import type { MemberRole } from '@/generated/prisma/enums';
import type {
  createProjectSchema,
  listProjectsSchema,
  projectIdSchema,
  projectSettingsSchema,
  updateProjectSchema,
} from '@/server/projects/schemas';

export type ProjectIdInput = z.input<typeof projectIdSchema>;
export type ListProjectsInput = z.input<typeof listProjectsSchema>;
export type CreateProjectInput = z.input<typeof createProjectSchema>;
export type UpdateProjectInput = z.input<typeof updateProjectSchema>;
export type ProjectSettingsValues = z.input<typeof projectSettingsSchema>;

export interface ProjectSummary {
  id: number;
  name: string;
  organizationId: number;
}

export type ProjectDetail = ProjectSummary &
  ProjectSettingsValues & {
    createdAt: Date;
    updatedAt: Date;
    organization: { id: number; name: string };
    role: MemberRole;
  };

export interface DeleteProjectResult {
  nextProjectId: number;
}
