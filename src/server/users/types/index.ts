import type { z } from 'zod';

import type { updateCurrentUserSchema } from '@/server/users/schemas';

export type UpdateCurrentUserInput = z.input<typeof updateCurrentUserSchema>;

export type CurrentUser = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  lastSignInAt: Date | null;
};
