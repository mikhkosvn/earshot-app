import 'server-only';

import { ActionError } from '@/server/common/run-action';
import { detailErrorResponse } from '@/server/public-api/error-response';

export const withActionErrors = async (run: () => Promise<Response>) => {
  try {
    return await run();
  } catch (error) {
    if (error instanceof ActionError) {
      return detailErrorResponse(error.status, error.message);
    }
    throw error;
  }
};
