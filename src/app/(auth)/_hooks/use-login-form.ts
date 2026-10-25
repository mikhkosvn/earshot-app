'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInSchema } from '@/server/auth/schemas';
import type { SignInInput } from '@/server/auth/types';

import { useSignInMutation } from './mutations/use-sign-in-mutation';

export const useLoginForm = () => {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });
  const signIn = useSignInMutation();

  const onSubmit = form.handleSubmit((values) => signIn.mutate(values));

  return { form, onSubmit };
};
