import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { fileResponse } from '@/server/files/utils/file-response';
import { shareTokenSchema } from '@/server/share-links/schemas';
import { findSharedFile } from '@/server/share-links/shared/find-shared-file';

const fileIdSchema = z.uuid();

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/share/[token]/files/[fileId]'>,
) {
  const route = await context.params;
  const parsedToken = shareTokenSchema.safeParse(route.token);
  const parsedId = fileIdSchema.safeParse(route.fileId);
  if (!parsedToken.success || !parsedId.success) {
    return new Response(null, { status: 404 });
  }
  const file = await findSharedFile(parsedToken.data, parsedId.data);
  if (!file) return new Response(null, { status: 404 });

  return fileResponse(request, file);
}
