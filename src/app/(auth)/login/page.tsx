import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthCard } from '@/app/(auth)/_components/auth-card';
import { AuthFormSkeleton } from '@/app/(auth)/_components/auth-form-skeleton';

import { LoginGate } from './_components/login-gate';

export const metadata: Metadata = {
  title: 'Sign in | Earshot',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in to Earshot"
      description="Enter your email and your password."
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <LoginGate />
      </Suspense>
    </AuthCard>
  );
}
