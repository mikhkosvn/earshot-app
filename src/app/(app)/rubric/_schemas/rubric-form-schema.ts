import type { z } from 'zod';

import { saveRubricSchema } from '@/server/rubric/schemas';

export const rubricFormSchema = saveRubricSchema.pick({ rules: true });

export type RubricFormValues = z.input<typeof rubricFormSchema>;
