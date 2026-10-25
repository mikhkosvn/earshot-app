import { NextResponse, type NextRequest } from 'next/server';

import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { SESSION_COOKIE_NAME } from '@/server/auth/constants/session';
import {
  CURRENT_PROJECT_COOKIE_MAX_AGE_SECONDS,
  CURRENT_PROJECT_COOKIE_NAME,
} from '@/server/projects/constants/current-project-cookie';

const PUBLIC_PATHS: string[] = [UrlGenerator.login(), UrlGenerator.signup()];
const SHARE_PATH_PREFIX = UrlGenerator.share({ token: '' });

const PROJECT_PATH_PATTERN = /^\/(\d+)(?:\/|$)/;
const PROJECT_QUERY_PATTERN = /^\d+$/;

const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.includes(pathname) || pathname.startsWith(SHARE_PATH_PREFIX);

const readUrlProjectId = (request: NextRequest) => {
  const pathMatch = PROJECT_PATH_PATTERN.exec(request.nextUrl.pathname);
  if (pathMatch) return pathMatch[1];
  const queryValue = request.nextUrl.searchParams.get(PROJECT_QUERY_KEY);
  if (queryValue && PROJECT_QUERY_PATTERN.test(queryValue)) return queryValue;
  return null;
};

export function proxy(request: NextRequest) {
  if (isPublicPath(request.nextUrl.pathname)) return NextResponse.next();

  if (!request.cookies.has(SESSION_COOKIE_NAME)) {
    return NextResponse.redirect(new URL(UrlGenerator.login(), request.url));
  }

  const projectId = readUrlProjectId(request);
  if (!projectId) return NextResponse.next();
  if (request.cookies.get(CURRENT_PROJECT_COOKIE_NAME)?.value === projectId) {
    return NextResponse.next();
  }

  request.cookies.set(CURRENT_PROJECT_COOKIE_NAME, projectId);
  const response = NextResponse.next({
    request: { headers: request.headers },
  });
  response.cookies.set(CURRENT_PROJECT_COOKIE_NAME, projectId, {
    sameSite: 'lax',
    path: '/',
    maxAge: CURRENT_PROJECT_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|_next/data|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml|webmanifest|woff2?)$).*)',
  ],
};
