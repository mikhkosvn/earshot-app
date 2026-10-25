'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signUpSchema } from '@/server/auth/schemas';
import type { SignUpInput } from '@/server/auth/types';

import { useSignUpMutation } from './mutations/use-sign-up-mutation';

export const useSignupForm = () => {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', organizationName: '' },
  });
  const signUp = useSignUpMutation();

  const onSubmit = form.handleSubmit((values) => signUp.mutate(values));

  return { form, onSubmit };
};
