import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { TriggerType } from '@/lib/logging/constants';
import { fileResponse } from '@/server/files/utils/file-response';
import { HttpMethod, RouteOperation } from '@/server/public-api/constants';
import { withRouteEvent } from '@/server/public-api/with-route-event';
import { shareTokenSchema } from '@/server/share-links/schemas';
import { findSharedFile } from '@/server/share-links/shared/find-shared-file';

const fileIdSchema = z.uuid();

export const GET = withRouteEvent(
  {
    operation: RouteOperation.shared_file_download,
    trigger: TriggerType.user,
    method: HttpMethod.get,
    route: '/api/share/[token]/files/[fileId]',
  },
  async (
    request: NextRequest,
    context: RouteContext<'/api/share/[token]/files/[fileId]'>,
  ) => {
    const route = await context.params;
    const parsedToken = shareTokenSchema.safeParse(route.token);
    const parsedId = fileIdSchema.safeParse(route.fileId);
    if (!parsedToken.success || !parsedId.success) {
      return new Response(null, { status: 404 });
    }
    const file = await findSharedFile(parsedToken.data, parsedId.data);
    if (!file) return new Response(null, { status: 404 });

    return fileResponse(request, file);
  },
);
