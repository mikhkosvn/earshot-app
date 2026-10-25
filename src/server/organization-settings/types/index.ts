import type { z } from 'zod';

import type { MemberRole, TeamSize } from '@/generated/prisma/enums';
import type {
  organizationIdSchema,
  organizationSettingsSchema,
  updateOrganizationSettingsSchema,
} from '@/server/organization-settings/schemas';

export type OrganizationIdInput = z.input<typeof organizationIdSchema>;
export type OrganizationSettingsValues = z.input<
  typeof organizationSettingsSchema
>;
export type UpdateOrganizationSettingsInput = z.input<
  typeof updateOrganizationSettingsSchema
>;

export type OrganizationProjectRow = {
  id: number;
  name: string;
  createdAt: Date;
};

export type OrganizationSettings = {
  id: number;
  name: string;
  teamSize: TeamSize | null;
  maxConcurrentRuns: number;
  allowDuplicateCallIds: boolean;
  restrictNumbersToOwnImports: boolean;
  projects: OrganizationProjectRow[];
  role: MemberRole;
};
