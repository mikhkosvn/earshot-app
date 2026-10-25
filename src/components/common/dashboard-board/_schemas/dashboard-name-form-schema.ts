import type { z } from 'zod';

import { renameDashboardSchema } from '@/server/dashboards/schemas';

export const dashboardNameFormSchema = renameDashboardSchema.pick({
  name: true,
});

export type DashboardNameFormValues = z.input<typeof dashboardNameFormSchema>;
