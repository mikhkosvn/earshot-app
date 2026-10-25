import type { z } from 'zod';

import { createProjectSchema } from '@/server/projects/schemas';

export const projectNameFormSchema = createProjectSchema.pick({ name: true });

export type ProjectNameFormValues = z.input<typeof projectNameFormSchema>;
