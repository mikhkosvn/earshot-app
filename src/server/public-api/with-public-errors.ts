import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { ActionError } from '@/server/common/run-action';
import {
  NOT_FOUND_DETAIL,
  STATUS_CODE_NOT_FOUND,
} from '@/server/public-api/constants';
import { detailErrorResponse } from '@/server/public-api/error-response';

const RECORD_NOT_FOUND_CODE = 'P2025';

const isRecordNotFound = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === RECORD_NOT_FOUND_CODE;

export const withPublicErrors = async (run: () => Promise<Response>) => {
  try {
    return await run();
  } catch (error) {
    if (error instanceof ActionError) {
      return detailErrorResponse(error.status, error.message);
    }
    if (isRecordNotFound(error)) {
      return detailErrorResponse(STATUS_CODE_NOT_FOUND, NOT_FOUND_DETAIL);
    }
    throw error;
  }
};
