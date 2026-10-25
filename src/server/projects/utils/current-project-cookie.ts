import 'server-only';

import { cookies } from 'next/headers';

import {
  CURRENT_PROJECT_COOKIE_MAX_AGE_SECONDS,
  CURRENT_PROJECT_COOKIE_NAME,
} from '@/server/projects/constants/current-project-cookie';

export const readCurrentProjectCookie = async () => {
  const value = (await cookies()).get(CURRENT_PROJECT_COOKIE_NAME)?.value;
  const projectId = Number(value);
  if (!Number.isInteger(projectId) || projectId <= 0) return null;
  return projectId;
};

export const setCurrentProjectCookie = async (projectId: number) => {
  (await cookies()).set(CURRENT_PROJECT_COOKIE_NAME, String(projectId), {
    sameSite: 'lax',
    path: '/',
    maxAge: CURRENT_PROJECT_COOKIE_MAX_AGE_SECONDS,
  });
};
