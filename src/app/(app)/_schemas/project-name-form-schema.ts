import { createProjectSchema } from '@/server/projects/schemas';

export const projectNameFormSchema = createProjectSchema.pick({ name: true });
