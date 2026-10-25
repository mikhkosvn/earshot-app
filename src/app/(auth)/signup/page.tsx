import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthCard } from '@/app/(auth)/_components/auth-card';
import { AuthFormSkeleton } from '@/app/(auth)/_components/auth-form-skeleton';

import { SignupGate } from './_components/signup-gate';

export const metadata: Metadata = {
  title: 'Create account | Earshot',
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Create the owner account, the first organization, and the first project."
    >
      <Suspense fallback={<AuthFormSkeleton />}>
        <SignupGate />
      </Suspense>
    </AuthCard>
  );
}
