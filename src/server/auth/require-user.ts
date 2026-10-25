import 'server-only';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { getSessionUser } from './get-session-user';

export const requireUser = cache(async () => {
  const user = await getSessionUser();
  if (!user) redirect(UrlGenerator.login());

  return { user };
});
