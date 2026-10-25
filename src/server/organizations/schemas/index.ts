import { z } from 'zod';

export const organizationIdSchema = z.object({
  organizationId: z.number().int().positive(),
});
