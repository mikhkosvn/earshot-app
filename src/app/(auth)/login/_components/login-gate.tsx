import { io } from 'next/cache';
import { redirect } from 'next/navigation';

import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { isSignupOpenAction } from '@/server/auth/actions';

import { LoginForm } from './login-form';

export async function LoginGate() {
  await io();

  if (await isSignupOpenAction()) redirect(UrlGenerator.signup());
  return <LoginForm />;
}
