import type { z } from 'zod';

import type { organizationIdSchema } from '@/server/organizations/schemas';

export type OrganizationIdInput = z.input<typeof organizationIdSchema>;

export interface OrganizationSummary {
  id: number;
  name: string;
}
