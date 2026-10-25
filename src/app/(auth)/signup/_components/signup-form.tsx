'use client';

import { FormProvider } from 'react-hook-form';

import { AuthTextField } from '@/app/(auth)/_components/auth-text-field';
import { useIsSigningUp } from '@/app/(auth)/_hooks/use-is-signing-up';
import { useSignupForm } from '@/app/(auth)/_hooks/use-signup-form';
import { Button } from '@/components/ui/button';
import type { SignUpInput } from '@/server/auth/types';

import { SignupSubmitLabel } from './signup-submit-label';

export function SignupForm() {
  const { form, onSubmit } = useSignupForm();
  const isSigningUp = useIsSigningUp();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <AuthTextField<SignUpInput>
          name="name"
          label="Name"
          autoComplete="name"
        />
        <AuthTextField<SignUpInput>
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <AuthTextField<SignUpInput>
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
        />
        <AuthTextField<SignUpInput>
          name="organizationName"
          label="Organization name"
          autoComplete="organization"
          placeholder="Personal"
        />
        <Button type="submit" disabled={isSigningUp} className="w-full">
          <SignupSubmitLabel />
        </Button>
      </form>
    </FormProvider>
  );
}
