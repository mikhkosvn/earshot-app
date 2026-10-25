import { z } from 'zod';

import { emailSchema } from '@/server/auth/schemas';

export const updateCurrentUserSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(200),
  email: emailSchema,
});
