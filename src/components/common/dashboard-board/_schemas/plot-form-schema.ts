import { z } from 'zod';

import { WidgetField } from '@/generated/prisma/enums';
import {
  plotConfigBaseSchema,
  refinePlotConfig,
} from '@/server/dashboards/schemas';

export const plotFormSchema = plotConfigBaseSchema
  .extend({ field: z.enum(WidgetField).nullable() })
  .superRefine((plot, context) => {
    if (plot.field === null) {
      context.addIssue({
        code: 'custom',
        path: ['field'],
        message: 'Select a field to visualize.',
      });
    }
    refinePlotConfig(plot, context);
  });

export type PlotFormValues = z.output<typeof plotFormSchema>;
