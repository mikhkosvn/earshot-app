'use client';

import { FormProvider } from 'react-hook-form';

import { AuthTextField } from '@/app/(auth)/_components/auth-text-field';
import { useIsSigningIn } from '@/app/(auth)/_hooks/use-is-signing-in';
import { useLoginForm } from '@/app/(auth)/_hooks/use-login-form';
import { Button } from '@/components/ui/button';
import type { SignInInput } from '@/server/auth/types';

import { LoginSubmitLabel } from './login-submit-label';

export function LoginForm() {
  const { form, onSubmit } = useLoginForm();
  const isSigningIn = useIsSigningIn();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <AuthTextField<SignInInput>
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <AuthTextField<SignInInput>
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" disabled={isSigningIn} className="w-full">
          <LoginSubmitLabel />
        </Button>
      </form>
    </FormProvider>
  );
}
