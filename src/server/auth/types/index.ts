import type { z } from 'zod';

import type { signInSchema, signUpSchema } from '@/server/auth/schemas';

export type SignInInput = z.input<typeof signInSchema>;
export type SignUpInput = z.input<typeof signUpSchema>;
