import 'server-only';

import type { NextRequest } from 'next/server';
import { ZodError } from 'zod';

import { authenticateApiKey } from '@/server/api-keys/authenticate-api-key';
import { recordEventError } from '@/server/common/logging/event-fields';
import { INVALID_API_KEY_DETAIL } from '@/server/public-api/constants';
import {
  detailErrorResponse,
  zodErrorResponse,
} from '@/server/public-api/error-response';
import type { PublicApiContext } from '@/server/public-api/types';

interface RouteContext<TParams> {
  params: Promise<TParams>;
}

export const withApiKey =
  <TParams = Record<string, never>>(
    handler: (
      request: NextRequest,
      context: PublicApiContext<TParams>,
    ) => Promise<Response>,
  ) =>
  async (request: NextRequest, routeContext: RouteContext<TParams>) => {
    const auth = await authenticateApiKey(request);
    if (!auth) {
      return detailErrorResponse(401, INVALID_API_KEY_DETAIL);
    }
    try {
      return await handler(request, {
        auth,
        params: await routeContext.params,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        recordEventError(error);
        return zodErrorResponse(error);
      }
      throw error;
    }
  };
