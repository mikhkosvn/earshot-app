import 'server-only';

import { ActionError } from '@/server/common/run-action';

const INVALID_JSON_DETAIL = 'The request body is not valid JSON.';

export const readJsonBody = async (request: Request): Promise<unknown> => {
  try {
    return await request.json();
  } catch {
    throw new ActionError(INVALID_JSON_DETAIL);
  }
};
