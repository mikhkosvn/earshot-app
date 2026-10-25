import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { getSessionUser } from '@/server/auth';
import { findFileForUser } from '@/server/files/find-file-for-user';
import { fileResponse } from '@/server/files/utils/file-response';
import { AUTHENTICATION_REQUIRED_DETAIL } from '@/server/public-api/constants';
import { detailErrorResponse } from '@/server/public-api/error-response';

const fileIdSchema = z.uuid();

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/files/[fileId]'>,
) {
  const user = await getSessionUser();
  if (!user) {
    return detailErrorResponse(401, AUTHENTICATION_REQUIRED_DETAIL);
  }
  const parsedId = fileIdSchema.safeParse((await context.params).fileId);
  if (!parsedId.success) return new Response(null, { status: 404 });
  const file = await findFileForUser(parsedId.data, user.id);
  if (!file) return new Response(null, { status: 404 });

  return fileResponse(request, file);
}
