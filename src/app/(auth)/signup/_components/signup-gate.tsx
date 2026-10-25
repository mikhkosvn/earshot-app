import { io } from 'next/cache';
import { redirect } from 'next/navigation';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { isSignupOpenAction } from '@/server/auth/actions';

import { SignupForm } from './signup-form';

export async function SignupGate() {
  await io();

  if (!(await isSignupOpenAction())) redirect(UrlGenerator.login());
  return <SignupForm />;
}
