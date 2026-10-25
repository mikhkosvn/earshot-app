import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email('Enter a valid email address.'));

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Enter your password.'),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(200),
  email: emailSchema,
  password: z
    .string()
    .min(8, 'The password must have 8 or more characters.')
    .max(200),
  organizationName: z.string().trim().max(200),
});
