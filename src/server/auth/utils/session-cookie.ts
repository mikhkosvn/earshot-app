import 'server-only';

import { cookies } from 'next/headers';

import { SESSION_COOKIE_NAME } from '@/server/auth/constants/session';

export const readSessionCookie = async () =>
  (await cookies()).get(SESSION_COOKIE_NAME)?.value;

export const setSessionCookie = async (token: string, expires: Date) => {
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  });
};

export const clearSessionCookie = async () => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
};
